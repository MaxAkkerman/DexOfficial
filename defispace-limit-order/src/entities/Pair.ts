import {Field, Float, ID, Int, ObjectType} from "type-graphql";
import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";

@ObjectType()
@Entity()
export default class Pair {
  @Field(() => ID)
  @PrimaryColumn()
  addrPair: string;

  @Field(() => Float)
  @Column()
  aReserve: number;

  @Field(() => Float)
  @Column()
  bReserve: number;

  @Field(() => String)
  @Column()
  aRoot: string;

  @Field(() => String)
  @Column()
  bRoot: string;

  @Field(() => String)
  @Column()
  aName: string;

  @Field(() => String)
  @Column()
  bName: string;

  @Field(() => String)
  @Column()
  aSymbol: string;

  @Field(() => String)
  @Column()
  bSymbol: string;

  @Field(() => Int)
  @Column()
  aDecimals: number;

  @Field(() => Int)
  @Column()
  bDecimals: number;

  @Field(() => Float)
  abRatio: number;

  @Field(() => Float)
  baRatio: number;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  protected calculateRatio() {
    this.baRatio = this.aReserve / this.bReserve;
    this.abRatio = this.bReserve / this.aReserve;
  }
}
