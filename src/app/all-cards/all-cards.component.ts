import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CardsHttpService } from '../cards.service';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { TwoButtonDialog } from '../dialogs/two-button-dialog/two-button-dialog.component';
import { AddCardDialog } from '../dialogs/add-card-dialog/add-card-dialog.component';
import { CardRequest } from '../models/card-request';
import { Card } from '../models/card';

@Component({
  selector: 'all-cards',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    CurrencyPipe
  ],
  templateUrl: './all-cards.component.html',
  styleUrl: './all-cards.component.scss'
})
export class AllCardsComponent implements OnInit, AfterViewInit {

  private cards: Card[] = [];
  dataSource = new MatTableDataSource<Card>();
  displayedColumns: string[] = [
    'name',
    'sport',
    'year',
    'manufacturer',
    'psaValue',
    'remove'
  ];
  removeId: string;
  choice: string;
  addCardRequest: CardRequest;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private cardsHttpService: CardsHttpService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllCards();
    this.showAddCardDialog();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllCards() {
    this.cardsHttpService.getAllCards().subscribe(cardList => {
      this.cards = cardList;
      this.dataSource.data = this.cards;
    });
  }

  showRemoveCardDialog(id: string) {
    this.removeId = id;
    const dialogRef = this.dialog.open(TwoButtonDialog, {
      data: {
        question: "Are you sure you want to remove this card?",
        buttonOne: "Nevermind",
        buttonTwo: "Remove It",
        choice: false
      }
    });

    dialogRef.afterClosed().subscribe(choice => {
      if (choice) {
        this.cardsHttpService.deleteCard(this.removeId).subscribe({
          complete: () => this.getAllCards()
        });
      }
    });
  }

  showAddCardDialog() {
    const dialogRef = this.dialog.open(AddCardDialog, {
      data: { 
        addCardRequest: new CardRequest()
      }
    });

    dialogRef.afterClosed().subscribe(addCardRequest => {
      this.cardsHttpService.addCard(addCardRequest).subscribe({
        complete: () => this.getAllCards(),
        error: () => this.handleAddCardError()
      });
    });
  }

  handleAddCardError(): void {
    console.log("Error adding card!");
  }

}
