import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  @Output() filtroChange = new EventEmitter<any>();

  filtro = {
    search: '',
    estados: [] as string[],
    prioridades: [] as string[]
  };

  estadosDisponibles = [
    { label: 'Completadas', value: 'completadas' },
    { label: 'Pendientes', value: 'pendientes' },
    { label: 'Vencida', value: 'vencida' }
  ];
  prioridadesDisponibles = [
    { label: 'Alta', value: 'alta' },
    { label: 'Media', value: 'media' },
    { label: 'Baja', value: 'baja' }
  ];

  onSearchChange() {
    this.emitirFiltro();
  }

  onEstadoChange(estado: string, checked: boolean) {
    if (checked) {
      if (!this.filtro.estados.includes(estado)) this.filtro.estados.push(estado);
    } else {
      this.filtro.estados = this.filtro.estados.filter(e => e !== estado);
    }
    this.emitirFiltro();
  }

  onPrioridadChange(prioridad: string, checked: boolean) {
    if (checked) {
      if (!this.filtro.prioridades.includes(prioridad)) this.filtro.prioridades.push(prioridad);
    } else {
      this.filtro.prioridades = this.filtro.prioridades.filter(p => p !== prioridad);
    }
    this.emitirFiltro();
  }

  onEstadoCheckboxChange(event: Event, estado: string) {
    const checked = (event.target as HTMLInputElement).checked;
    this.onEstadoChange(estado, checked);
  }

  onPrioridadCheckboxChange(event: Event, prioridad: string) {
    const checked = (event.target as HTMLInputElement).checked;
    this.onPrioridadChange(prioridad, checked);
  }

  emitirFiltro() {
    this.filtroChange.emit({ ...this.filtro });
  }
}