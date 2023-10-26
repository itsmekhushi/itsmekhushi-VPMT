import { Component} from '@angular/core';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent  {


  // ngOnInit(): void {

  // }

//   getDetail() {
//     this.ticketServices.getData({
//       ticket_project_id: this.project_id_data
//     }).subscribe({
//       next: (res) => {
//         console.log("ticket details", res);
//       }
//     })
//   }


//   // getticket() {
//   //   this.ticketService.getTicket()
//   //     .subscribe({
//   //       next: (res) => {
//   //         console.log("get ticket response", res)
//   //         this.dataSource = new MatTableDataSource(res.Data);
//   //         this.dataSource.paginator = this.paginator;
//   //         this.dataSource.sort = this.sort;
//   //       },
//   //       error: () => {
//   //         this.toast.error({ detail: "Error", summary: "Fetching data", duration: 5000 });
//   //       }
//   //     })
//   // }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();



//   editTicket(element: any) {
//     const dialogref = this.dialog.open(UpdateTicketComponent, {

//       data: element

//     });
//     dialogref.afterClosed().subscribe({
//       next: (val) => {
//         if (val) {
//           this.getticket();
//         }
//       }

//     })

//   }

//   deleteTicket(ticket_id: number) {
//     this.ticketService.deleteTicket({ _id: ticket_id }).subscribe({
//       next: (res) => {
//         this.toast.success({ detail: "Deleted", summary: "Deleted data", duration: 5000 });
//         this.getticket()
//       },
//       error: () => {
//         this.toast.error({ detail: "Error", summary: "while deleting", duration: 5000 });
//       }
//     })
//   }

}
