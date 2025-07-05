import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Tarea } from '../task-item/task-item.interface';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-task-report',
  standalone: true,
  templateUrl: './task-report.component.html',
  styleUrl: './task-report.component.css'
})
export class TaskReportComponent implements OnChanges {
  @Input() tareas: Tarea[] = [];

  total: number = 0;
  completadas: number = 0;
  pendientes: number = 0;
  vencidas: number = 0;

  porcentajeCompletadas: number = 0;
  porcentajePendientes: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tareas']) {
      this.calcularEstadisticas();
    }
  }

  calcularEstadisticas() {
    this.total = this.tareas.length;
    this.completadas = this.tareas.filter(t => t.completado).length;
    this.vencidas = this.tareas.filter(t => !t.completado && this.tareaVencida(t)).length;
    this.pendientes = this.tareas.filter(t => !t.completado && !this.tareaVencida(t)).length; // Esto debería ser tareas no completadas y no vencidas para el cálculo de pendientes "reales". Si quieres todas las no completadas sería this.total - this.completadas.

    // Calcular porcentajes
    if (this.total > 0) {
      this.porcentajeCompletadas = (this.completadas / this.total) * 100;
      this.porcentajePendientes = (this.pendientes / this.total) * 100; // O (this.total - this.completadas) / this.total * 100
    } else {
      this.porcentajeCompletadas = 0;
      this.porcentajePendientes = 0;
    }

  }


  tareaVencida(tarea: Tarea): boolean {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaVenci = new Date(tarea.fechaVenci);
    fechaVenci.setHours(0, 0, 0, 0);
    return fechaVenci < hoy;
  }

  exportarPdf(): void {
    const doc = new jsPDF();

    let yPos = 10; // Posición inicial en el eje Y

    // Título del reporte
    doc.setFontSize(22);
    doc.text('Reporte de Tareas', 10, yPos);
    yPos += 10;

    // Fecha de generación
    doc.setFontSize(10);
    const fechaActual = new Date().toLocaleDateString('es-CL'); // Formato de fecha chileno
    doc.text(`Fecha de generación: ${fechaActual}`, 10, yPos);
    yPos += 15;

    // Estadísticas generales
    doc.setFontSize(14);
    doc.text(`Tareas Totales: ${this.total}`, 10, yPos);
    yPos += 8;
    doc.text(`Tareas Completadas: ${this.completadas} (${this.porcentajeCompletadas.toFixed(2)}%)`, 10, yPos);
    yPos += 8;
    doc.text(`Tareas Pendientes: ${this.pendientes} (${this.porcentajePendientes.toFixed(2)}%)`, 10, yPos);
    yPos += 8;
    doc.text(`Tareas Vencidas: ${this.vencidas}`, 10, yPos);
    yPos += 15;

    // Línea separadora
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2
    yPos += 10;

    // Listado de tareas
    doc.setFontSize(16);
    doc.text('Detalle de Tareas:', 10, yPos);
    yPos += 10;

    doc.setFontSize(10);
    // Encabezados de la tabla (opcional, si quieres un formato de tabla más estricto)
    // doc.text('Título', 10, yPos);
    // doc.text('Prioridad', 70, yPos);
    // doc.text('Vencimiento', 100, yPos);
    // doc.text('Estado', 140, yPos);
    // yPos += 5;

    // Iterar sobre las tareas y añadirlas al PDF
    this.tareas.forEach(tarea => {
      // Si el contenido excede la página, añadir una nueva página
      if (yPos > 280) { // Aproximadamente 280 es el límite inferior de una página A4
        doc.addPage();
        yPos = 10;
        doc.setFontSize(16);
        doc.text('Detalle de Tareas (continuación):', 10, yPos);
        yPos += 10;
        doc.setFontSize(10);
      }

      doc.text(`Título: ${tarea.titulo}`, 10, yPos);
      yPos += 5;
      doc.text(`Descripción: ${tarea.descripcion || 'N/A'}`, 10, yPos);
      yPos += 5;
      doc.text(`Prioridad: ${tarea.prioridad}`, 10, yPos);
      yPos += 5;
      doc.text(`Fecha Vencimiento: ${new Date(tarea.fechaVenci).toLocaleDateString('es-CL')}`, 10, yPos);
      yPos += 5;
      const estado = tarea.completado ? 'Completada' : (this.tareaVencida(tarea) ? 'Vencida' : 'Pendiente');
      doc.text(`Estado: ${estado}`, 10, yPos);
      yPos += 8; // Espacio entre tareas

      doc.line(10, yPos, 200, yPos); // Separador entre tareas
      yPos += 5;
    });

    // Guardar el PDF
    doc.save(`reporte_tareas_${new Date().toISOString().split('T')[0]}.pdf`);
  }
}