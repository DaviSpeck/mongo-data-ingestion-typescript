import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('historico_processo')
export class HistoricoProcesso {
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

  @Column({ name: 'dh_acao', type: 'timestamp' })
  dhAcao: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}