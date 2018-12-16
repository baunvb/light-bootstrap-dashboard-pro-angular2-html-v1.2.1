import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FixedPluginComponent } from './fixedplugin.component';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
@NgModule({
    imports: [ RouterModule, CommonModule, JwBootstrapSwitchNg2Module ],
    declarations: [ FixedPluginComponent ],
    exports: [ FixedPluginComponent ]
})

export class FixedPluginModule {}
