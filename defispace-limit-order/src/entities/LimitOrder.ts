import {Field, Float, ID, Int, ObjectType} from "type-graphql";
import {Column, Entity, PrimaryColumn} from "typeorm";

import {DirectionPair} from "../types";
import Pair from "./Pair";

@ObjectType()
@Entity()
export default class LimitOrder {
  @Field(() => ID)
  @PrimaryColumn()
  addrOrder: string;

  @Field(() => String, {nullable: true})
  @Column({nullable: true})
  addrRoot?: string;

  @Field(() => String, {nullable: true})
  @Column({nullable: true})
  addrRouter?: string;

  @Field(() => String)
  @Column()
  addrOwner: string;

  @Field(() => String)
  @Column()
  addrPair: string;

  @Field(() => Pair)
  protected pair: Pair;

  @Field(() => DirectionPair)
  @Column({
    type: "simple-enum",
    enum: DirectionPair,
  })
  directionPair: DirectionPair;

  @Field(() => Float)
  @Column()
  price: number;

  @Field(() => Float)
  protected priceRaw: number;

  @Field(() => Float)
  @Column()
  amount: number;

  @Field(() => Float)
  protected amountRaw: number;

  @Field(() => Int)
  @Column()
  decimals: number;

  @Field(() => String, {nullable: true})
  @Column({nullable: true})
  walletOwnerRoot?: string;

  @Field(() => String)
  @Column()
  walletOwnerFrom: string;

  @Field(() => String)
  @Column()
  walletOwnerTo: string;
}
