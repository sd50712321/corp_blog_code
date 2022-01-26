import { Exclude } from 'class-transformer';
import { User } from 'src/users/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Camp extends BaseEntity {
  constructor(partial: Partial<Camp>) {
    super();
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('increment', {
    comment: '캠핑장 인덱스',
  })
  camp_idx: number;

  @Column({
    comment: '캠프 이름',
    type: 'varchar',
    length: 50,
  })
  camp_name: string;

  @Column({
    comment: '우편 번호',
    type: 'char',
    length: 5,
  })
  zip_code: string;

  @Column({
    comment: '지번 주소',
    type: 'varchar',
    length: 100,
  })
  jibun_addr: string;

  @Column({
    comment: '상세 주소',
    type: 'varchar',
    length: 100,
  })
  dets_addr: string;

  @Column({
    comment: '캠핑장 소개',
    type: 'text',
  })
  intro: string;

  @Column({
    comment: '캠핑장 번호',
    type: 'int',
  })
  mobile: string;

  @Column({
    comment: '최초 생성 일자',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  first_create_dt: Date;

  @Column({
    comment: '마지막 수정 일자',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  last_update_dt: Date;

  @ManyToOne((_type) => User, (user) => user.camps, {
    onDelete: 'CASCADE',
    createForeignKeyConstraints: true,
  })
  @Exclude({ toPlainOnly: true })
  @JoinColumn({ name: 'user_idx' })
  user: User;
}
