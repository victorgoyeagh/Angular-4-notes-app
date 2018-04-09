import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeHtml, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from './../../../environments/environment';

@Component({
    selector: 'e-header',
    templateUrl: './templates/header.template.html'
})

export class HeaderComponent implements OnInit {
    private siteName = environment.configurations.settings.siteName;
    
    constructor(
        private _sanitizer: DomSanitizer,
    ) {
        let _self = this;
     
    }

    ngOnInit() {
    }
}