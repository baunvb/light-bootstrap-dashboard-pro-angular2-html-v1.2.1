import {Component, OnInit} from '@angular/core';
import {HomestayService} from './homestay.service';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs/Observable';
import {User} from '../interface/user';
import {Homestay} from '../interface/homestay';

declare var $: any;

declare interface DataTableHomestay {
    headerRow: string[];
    footerRow: string[];
    dataRows: Homestay[];
}


@Component({
    selector: 'app-homestay',
    templateUrl: './homestay.component.html',
    styleUrls: ['./homestay.component.scss']
})
export class HomestayComponent implements OnInit {
    public homestay: Homestay[];
    public dataTableHomestay;

    constructor(private homestayService: HomestayService) {
    }

    ngOnInit() {
        this.getData();
        // this.initDataTableHomestay();
    }

    ngAfterViewInit() {

        $('#datatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
            responsive: true,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search records',
            }

        });


        let table = $('#datatables').DataTable();

        // Edit record
        table.on('click', '.edit', function () {
            let $tr = $(this).closest('tr');

            let data = table.row($tr).data();
            alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
        });

        // Delete a record
        table.on('click', '.remove', function (e) {
            let $tr = $(this).closest('tr');
            table.row($tr).remove().draw();
            e.preventDefault();
        });

        // Like record
        table.on('click', '.like', function () {
            alert('You clicked on Like button');
        });
    }

    getData() {
        this.homestayService.getHomestay().subscribe(
            data => {
                console.log('Homestay', data);
                this.homestay = data['homestay'];
                let dataset = new Array();
                this.homestay.forEach(function (element) {
                    dataset.push([element.id, element.name, element.address]);
                });

                console.log(dataset);

                this.dataTableHomestay = {
                    headerRow: ['ID', 'Name', 'Address', 'Action'],
                    footerRow: ['ID', 'Name', 'Address', 'Action'],
                    dataRows: dataset
                }

            }
        );
    }

    initDataTableHomestay() {
        let dataset = new Array();
        this.homestay.forEach(function (element) {
            dataset.push([element.id, element.name, element.address]);
        });

        console.log(dataset);

        this.dataTableHomestay = {
            headerRow: ['ID', 'Name', 'Address', 'Action'],
            footerRow: ['ID', 'Name', 'Address', 'Action'],
            dataRows: dataset
        }
    }


}
