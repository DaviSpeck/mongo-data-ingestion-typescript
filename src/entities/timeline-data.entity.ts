import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('timeline-data')
export class TimelineData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nr_processo', type: 'varchar', length: 50 })
  nrProcesso: string;

  @Column({ name: 'ds_acao_processo', type: 'text' })
  dsAcaoProcesso: string;

  @Column({ name: 'ds_observacao', type: 'text', nullable: true })
  dsObservacao: string;

  @Column({ name: 'ds_usuario', type: 'varchar', length: 100 })
  dsUsuario: string;

  @Column({ name: 'ano', type: 'int' })
  ano: number;

  @Column({ name: 'mes', type: 'int' })
  mes: number;

  @Column({ name: 'dia', type: 'int' })
  dia: number;

  @Column({ name: 'hora', type: 'time' })
  hora: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}