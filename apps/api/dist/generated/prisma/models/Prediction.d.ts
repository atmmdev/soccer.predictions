import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PredictionModel = runtime.Types.Result.DefaultSelection<Prisma.$PredictionPayload>;
export type AggregatePrediction = {
    _count: PredictionCountAggregateOutputType | null;
    _avg: PredictionAvgAggregateOutputType | null;
    _sum: PredictionSumAggregateOutputType | null;
    _min: PredictionMinAggregateOutputType | null;
    _max: PredictionMaxAggregateOutputType | null;
};
export type PredictionAvgAggregateOutputType = {
    id: number | null;
    poolId: number | null;
    userId: number | null;
    fixtureId: number | null;
    predictedHomeScore: number | null;
    predictedAwayScore: number | null;
    selectedPlayerId: number | null;
};
export type PredictionSumAggregateOutputType = {
    id: number | null;
    poolId: number | null;
    userId: number | null;
    fixtureId: number | null;
    predictedHomeScore: number | null;
    predictedAwayScore: number | null;
    selectedPlayerId: number | null;
};
export type PredictionMinAggregateOutputType = {
    id: number | null;
    poolId: number | null;
    userId: number | null;
    fixtureId: number | null;
    predictedHomeScore: number | null;
    predictedAwayScore: number | null;
    selectedPlayerId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PredictionMaxAggregateOutputType = {
    id: number | null;
    poolId: number | null;
    userId: number | null;
    fixtureId: number | null;
    predictedHomeScore: number | null;
    predictedAwayScore: number | null;
    selectedPlayerId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PredictionCountAggregateOutputType = {
    id: number;
    poolId: number;
    userId: number;
    fixtureId: number;
    predictedHomeScore: number;
    predictedAwayScore: number;
    selectedPlayerId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PredictionAvgAggregateInputType = {
    id?: true;
    poolId?: true;
    userId?: true;
    fixtureId?: true;
    predictedHomeScore?: true;
    predictedAwayScore?: true;
    selectedPlayerId?: true;
};
export type PredictionSumAggregateInputType = {
    id?: true;
    poolId?: true;
    userId?: true;
    fixtureId?: true;
    predictedHomeScore?: true;
    predictedAwayScore?: true;
    selectedPlayerId?: true;
};
export type PredictionMinAggregateInputType = {
    id?: true;
    poolId?: true;
    userId?: true;
    fixtureId?: true;
    predictedHomeScore?: true;
    predictedAwayScore?: true;
    selectedPlayerId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PredictionMaxAggregateInputType = {
    id?: true;
    poolId?: true;
    userId?: true;
    fixtureId?: true;
    predictedHomeScore?: true;
    predictedAwayScore?: true;
    selectedPlayerId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PredictionCountAggregateInputType = {
    id?: true;
    poolId?: true;
    userId?: true;
    fixtureId?: true;
    predictedHomeScore?: true;
    predictedAwayScore?: true;
    selectedPlayerId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PredictionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PredictionWhereInput;
    orderBy?: Prisma.PredictionOrderByWithRelationInput | Prisma.PredictionOrderByWithRelationInput[];
    cursor?: Prisma.PredictionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PredictionCountAggregateInputType;
    _avg?: PredictionAvgAggregateInputType;
    _sum?: PredictionSumAggregateInputType;
    _min?: PredictionMinAggregateInputType;
    _max?: PredictionMaxAggregateInputType;
};
export type GetPredictionAggregateType<T extends PredictionAggregateArgs> = {
    [P in keyof T & keyof AggregatePrediction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePrediction[P]> : Prisma.GetScalarType<T[P], AggregatePrediction[P]>;
};
export type PredictionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PredictionWhereInput;
    orderBy?: Prisma.PredictionOrderByWithAggregationInput | Prisma.PredictionOrderByWithAggregationInput[];
    by: Prisma.PredictionScalarFieldEnum[] | Prisma.PredictionScalarFieldEnum;
    having?: Prisma.PredictionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PredictionCountAggregateInputType | true;
    _avg?: PredictionAvgAggregateInputType;
    _sum?: PredictionSumAggregateInputType;
    _min?: PredictionMinAggregateInputType;
    _max?: PredictionMaxAggregateInputType;
};
export type PredictionGroupByOutputType = {
    id: number;
    poolId: number;
    userId: number;
    fixtureId: number;
    predictedHomeScore: number;
    predictedAwayScore: number;
    selectedPlayerId: number | null;
    createdAt: Date;
    updatedAt: Date;
    _count: PredictionCountAggregateOutputType | null;
    _avg: PredictionAvgAggregateOutputType | null;
    _sum: PredictionSumAggregateOutputType | null;
    _min: PredictionMinAggregateOutputType | null;
    _max: PredictionMaxAggregateOutputType | null;
};
export type GetPredictionGroupByPayload<T extends PredictionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PredictionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PredictionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PredictionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PredictionGroupByOutputType[P]>;
}>>;
export type PredictionWhereInput = {
    AND?: Prisma.PredictionWhereInput | Prisma.PredictionWhereInput[];
    OR?: Prisma.PredictionWhereInput[];
    NOT?: Prisma.PredictionWhereInput | Prisma.PredictionWhereInput[];
    id?: Prisma.IntFilter<"Prediction"> | number;
    poolId?: Prisma.IntFilter<"Prediction"> | number;
    userId?: Prisma.IntFilter<"Prediction"> | number;
    fixtureId?: Prisma.IntFilter<"Prediction"> | number;
    predictedHomeScore?: Prisma.IntFilter<"Prediction"> | number;
    predictedAwayScore?: Prisma.IntFilter<"Prediction"> | number;
    selectedPlayerId?: Prisma.IntNullableFilter<"Prediction"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Prediction"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Prediction"> | Date | string;
    pool?: Prisma.XOR<Prisma.PoolScalarRelationFilter, Prisma.PoolWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    fixture?: Prisma.XOR<Prisma.FixtureScalarRelationFilter, Prisma.FixtureWhereInput>;
};
export type PredictionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fixtureId?: Prisma.SortOrder;
    predictedHomeScore?: Prisma.SortOrder;
    predictedAwayScore?: Prisma.SortOrder;
    selectedPlayerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pool?: Prisma.PoolOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    fixture?: Prisma.FixtureOrderByWithRelationInput;
};
export type PredictionWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    poolId_userId_fixtureId?: Prisma.PredictionPoolIdUserIdFixtureIdCompoundUniqueInput;
    AND?: Prisma.PredictionWhereInput | Prisma.PredictionWhereInput[];
    OR?: Prisma.PredictionWhereInput[];
    NOT?: Prisma.PredictionWhereInput | Prisma.PredictionWhereInput[];
    poolId?: Prisma.IntFilter<"Prediction"> | number;
    userId?: Prisma.IntFilter<"Prediction"> | number;
    fixtureId?: Prisma.IntFilter<"Prediction"> | number;
    predictedHomeScore?: Prisma.IntFilter<"Prediction"> | number;
    predictedAwayScore?: Prisma.IntFilter<"Prediction"> | number;
    selectedPlayerId?: Prisma.IntNullableFilter<"Prediction"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Prediction"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Prediction"> | Date | string;
    pool?: Prisma.XOR<Prisma.PoolScalarRelationFilter, Prisma.PoolWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    fixture?: Prisma.XOR<Prisma.FixtureScalarRelationFilter, Prisma.FixtureWhereInput>;
}, "id" | "poolId_userId_fixtureId">;
export type PredictionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fixtureId?: Prisma.SortOrder;
    predictedHomeScore?: Prisma.SortOrder;
    predictedAwayScore?: Prisma.SortOrder;
    selectedPlayerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PredictionCountOrderByAggregateInput;
    _avg?: Prisma.PredictionAvgOrderByAggregateInput;
    _max?: Prisma.PredictionMaxOrderByAggregateInput;
    _min?: Prisma.PredictionMinOrderByAggregateInput;
    _sum?: Prisma.PredictionSumOrderByAggregateInput;
};
export type PredictionScalarWhereWithAggregatesInput = {
    AND?: Prisma.PredictionScalarWhereWithAggregatesInput | Prisma.PredictionScalarWhereWithAggregatesInput[];
    OR?: Prisma.PredictionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PredictionScalarWhereWithAggregatesInput | Prisma.PredictionScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Prediction"> | number;
    poolId?: Prisma.IntWithAggregatesFilter<"Prediction"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"Prediction"> | number;
    fixtureId?: Prisma.IntWithAggregatesFilter<"Prediction"> | number;
    predictedHomeScore?: Prisma.IntWithAggregatesFilter<"Prediction"> | number;
    predictedAwayScore?: Prisma.IntWithAggregatesFilter<"Prediction"> | number;
    selectedPlayerId?: Prisma.IntNullableWithAggregatesFilter<"Prediction"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Prediction"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Prediction"> | Date | string;
};
export type PredictionCreateInput = {
    predictedHomeScore: number;
    predictedAwayScore: number;
    selectedPlayerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pool: Prisma.PoolCreateNestedOneWithoutPredictionsInput;
    user: Prisma.UserCreateNestedOneWithoutPredictionsInput;
    fixture: Prisma.FixtureCreateNestedOneWithoutPredictionsInput;
};
export type PredictionUncheckedCreateInput = {
    id?: number;
    poolId: number;
    userId: number;
    fixtureId: number;
    predictedHomeScore: number;
    predictedAwayScore: number;
    selectedPlayerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PredictionUpdateInput = {
    predictedHomeScore?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAwayScore?: Prisma.IntFieldUpdateOperationsInput | number;
    selectedPlayerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pool?: Prisma.PoolUpdateOneRequiredWithoutPredictionsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutPredictionsNestedInput;
    fixture?: Prisma.FixtureUpdateOneRequiredWithoutPredictionsNestedInput;
};
export type PredictionUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    fixtureId?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedHomeScore?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAwayScore?: Prisma.IntFieldUpdateOperationsInput | number;
    selectedPlayerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PredictionCreateManyInput = {
    id?: number;
    poolId: number;
    userId: number;
    fixtureId: number;
    predictedHomeScore: number;
    predictedAwayScore: number;
    selectedPlayerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PredictionUpdateManyMutationInput = {
    predictedHomeScore?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAwayScore?: Prisma.IntFieldUpdateOperationsInput | number;
    selectedPlayerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PredictionUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    fixtureId?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedHomeScore?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAwayScore?: Prisma.IntFieldUpdateOperationsInput | number;
    selectedPlayerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PredictionListRelationFilter = {
    every?: Prisma.PredictionWhereInput;
    some?: Prisma.PredictionWhereInput;
    none?: Prisma.PredictionWhereInput;
};
export type PredictionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PredictionPoolIdUserIdFixtureIdCompoundUniqueInput = {
    poolId: number;
    userId: number;
    fixtureId: number;
};
export type PredictionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fixtureId?: Prisma.SortOrder;
    predictedHomeScore?: Prisma.SortOrder;
    predictedAwayScore?: Prisma.SortOrder;
    selectedPlayerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PredictionAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fixtureId?: Prisma.SortOrder;
    predictedHomeScore?: Prisma.SortOrder;
    predictedAwayScore?: Prisma.SortOrder;
    selectedPlayerId?: Prisma.SortOrder;
};
export type PredictionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fixtureId?: Prisma.SortOrder;
    predictedHomeScore?: Prisma.SortOrder;
    predictedAwayScore?: Prisma.SortOrder;
    selectedPlayerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PredictionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fixtureId?: Prisma.SortOrder;
    predictedHomeScore?: Prisma.SortOrder;
    predictedAwayScore?: Prisma.SortOrder;
    selectedPlayerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PredictionSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fixtureId?: Prisma.SortOrder;
    predictedHomeScore?: Prisma.SortOrder;
    predictedAwayScore?: Prisma.SortOrder;
    selectedPlayerId?: Prisma.SortOrder;
};
export type PredictionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PredictionCreateWithoutUserInput, Prisma.PredictionUncheckedCreateWithoutUserInput> | Prisma.PredictionCreateWithoutUserInput[] | Prisma.PredictionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PredictionCreateOrConnectWithoutUserInput | Prisma.PredictionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PredictionCreateManyUserInputEnvelope;
    connect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
};
export type PredictionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PredictionCreateWithoutUserInput, Prisma.PredictionUncheckedCreateWithoutUserInput> | Prisma.PredictionCreateWithoutUserInput[] | Prisma.PredictionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PredictionCreateOrConnectWithoutUserInput | Prisma.PredictionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PredictionCreateManyUserInputEnvelope;
    connect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
};
export type PredictionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PredictionCreateWithoutUserInput, Prisma.PredictionUncheckedCreateWithoutUserInput> | Prisma.PredictionCreateWithoutUserInput[] | Prisma.PredictionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PredictionCreateOrConnectWithoutUserInput | Prisma.PredictionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PredictionUpsertWithWhereUniqueWithoutUserInput | Prisma.PredictionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PredictionCreateManyUserInputEnvelope;
    set?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    disconnect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    delete?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    connect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    update?: Prisma.PredictionUpdateWithWhereUniqueWithoutUserInput | Prisma.PredictionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PredictionUpdateManyWithWhereWithoutUserInput | Prisma.PredictionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PredictionScalarWhereInput | Prisma.PredictionScalarWhereInput[];
};
export type PredictionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PredictionCreateWithoutUserInput, Prisma.PredictionUncheckedCreateWithoutUserInput> | Prisma.PredictionCreateWithoutUserInput[] | Prisma.PredictionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PredictionCreateOrConnectWithoutUserInput | Prisma.PredictionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PredictionUpsertWithWhereUniqueWithoutUserInput | Prisma.PredictionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PredictionCreateManyUserInputEnvelope;
    set?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    disconnect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    delete?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    connect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    update?: Prisma.PredictionUpdateWithWhereUniqueWithoutUserInput | Prisma.PredictionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PredictionUpdateManyWithWhereWithoutUserInput | Prisma.PredictionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PredictionScalarWhereInput | Prisma.PredictionScalarWhereInput[];
};
export type PredictionCreateNestedManyWithoutFixtureInput = {
    create?: Prisma.XOR<Prisma.PredictionCreateWithoutFixtureInput, Prisma.PredictionUncheckedCreateWithoutFixtureInput> | Prisma.PredictionCreateWithoutFixtureInput[] | Prisma.PredictionUncheckedCreateWithoutFixtureInput[];
    connectOrCreate?: Prisma.PredictionCreateOrConnectWithoutFixtureInput | Prisma.PredictionCreateOrConnectWithoutFixtureInput[];
    createMany?: Prisma.PredictionCreateManyFixtureInputEnvelope;
    connect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
};
export type PredictionUncheckedCreateNestedManyWithoutFixtureInput = {
    create?: Prisma.XOR<Prisma.PredictionCreateWithoutFixtureInput, Prisma.PredictionUncheckedCreateWithoutFixtureInput> | Prisma.PredictionCreateWithoutFixtureInput[] | Prisma.PredictionUncheckedCreateWithoutFixtureInput[];
    connectOrCreate?: Prisma.PredictionCreateOrConnectWithoutFixtureInput | Prisma.PredictionCreateOrConnectWithoutFixtureInput[];
    createMany?: Prisma.PredictionCreateManyFixtureInputEnvelope;
    connect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
};
export type PredictionUpdateManyWithoutFixtureNestedInput = {
    create?: Prisma.XOR<Prisma.PredictionCreateWithoutFixtureInput, Prisma.PredictionUncheckedCreateWithoutFixtureInput> | Prisma.PredictionCreateWithoutFixtureInput[] | Prisma.PredictionUncheckedCreateWithoutFixtureInput[];
    connectOrCreate?: Prisma.PredictionCreateOrConnectWithoutFixtureInput | Prisma.PredictionCreateOrConnectWithoutFixtureInput[];
    upsert?: Prisma.PredictionUpsertWithWhereUniqueWithoutFixtureInput | Prisma.PredictionUpsertWithWhereUniqueWithoutFixtureInput[];
    createMany?: Prisma.PredictionCreateManyFixtureInputEnvelope;
    set?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    disconnect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    delete?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    connect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    update?: Prisma.PredictionUpdateWithWhereUniqueWithoutFixtureInput | Prisma.PredictionUpdateWithWhereUniqueWithoutFixtureInput[];
    updateMany?: Prisma.PredictionUpdateManyWithWhereWithoutFixtureInput | Prisma.PredictionUpdateManyWithWhereWithoutFixtureInput[];
    deleteMany?: Prisma.PredictionScalarWhereInput | Prisma.PredictionScalarWhereInput[];
};
export type PredictionUncheckedUpdateManyWithoutFixtureNestedInput = {
    create?: Prisma.XOR<Prisma.PredictionCreateWithoutFixtureInput, Prisma.PredictionUncheckedCreateWithoutFixtureInput> | Prisma.PredictionCreateWithoutFixtureInput[] | Prisma.PredictionUncheckedCreateWithoutFixtureInput[];
    connectOrCreate?: Prisma.PredictionCreateOrConnectWithoutFixtureInput | Prisma.PredictionCreateOrConnectWithoutFixtureInput[];
    upsert?: Prisma.PredictionUpsertWithWhereUniqueWithoutFixtureInput | Prisma.PredictionUpsertWithWhereUniqueWithoutFixtureInput[];
    createMany?: Prisma.PredictionCreateManyFixtureInputEnvelope;
    set?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    disconnect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    delete?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    connect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    update?: Prisma.PredictionUpdateWithWhereUniqueWithoutFixtureInput | Prisma.PredictionUpdateWithWhereUniqueWithoutFixtureInput[];
    updateMany?: Prisma.PredictionUpdateManyWithWhereWithoutFixtureInput | Prisma.PredictionUpdateManyWithWhereWithoutFixtureInput[];
    deleteMany?: Prisma.PredictionScalarWhereInput | Prisma.PredictionScalarWhereInput[];
};
export type PredictionCreateNestedManyWithoutPoolInput = {
    create?: Prisma.XOR<Prisma.PredictionCreateWithoutPoolInput, Prisma.PredictionUncheckedCreateWithoutPoolInput> | Prisma.PredictionCreateWithoutPoolInput[] | Prisma.PredictionUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.PredictionCreateOrConnectWithoutPoolInput | Prisma.PredictionCreateOrConnectWithoutPoolInput[];
    createMany?: Prisma.PredictionCreateManyPoolInputEnvelope;
    connect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
};
export type PredictionUncheckedCreateNestedManyWithoutPoolInput = {
    create?: Prisma.XOR<Prisma.PredictionCreateWithoutPoolInput, Prisma.PredictionUncheckedCreateWithoutPoolInput> | Prisma.PredictionCreateWithoutPoolInput[] | Prisma.PredictionUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.PredictionCreateOrConnectWithoutPoolInput | Prisma.PredictionCreateOrConnectWithoutPoolInput[];
    createMany?: Prisma.PredictionCreateManyPoolInputEnvelope;
    connect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
};
export type PredictionUpdateManyWithoutPoolNestedInput = {
    create?: Prisma.XOR<Prisma.PredictionCreateWithoutPoolInput, Prisma.PredictionUncheckedCreateWithoutPoolInput> | Prisma.PredictionCreateWithoutPoolInput[] | Prisma.PredictionUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.PredictionCreateOrConnectWithoutPoolInput | Prisma.PredictionCreateOrConnectWithoutPoolInput[];
    upsert?: Prisma.PredictionUpsertWithWhereUniqueWithoutPoolInput | Prisma.PredictionUpsertWithWhereUniqueWithoutPoolInput[];
    createMany?: Prisma.PredictionCreateManyPoolInputEnvelope;
    set?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    disconnect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    delete?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    connect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    update?: Prisma.PredictionUpdateWithWhereUniqueWithoutPoolInput | Prisma.PredictionUpdateWithWhereUniqueWithoutPoolInput[];
    updateMany?: Prisma.PredictionUpdateManyWithWhereWithoutPoolInput | Prisma.PredictionUpdateManyWithWhereWithoutPoolInput[];
    deleteMany?: Prisma.PredictionScalarWhereInput | Prisma.PredictionScalarWhereInput[];
};
export type PredictionUncheckedUpdateManyWithoutPoolNestedInput = {
    create?: Prisma.XOR<Prisma.PredictionCreateWithoutPoolInput, Prisma.PredictionUncheckedCreateWithoutPoolInput> | Prisma.PredictionCreateWithoutPoolInput[] | Prisma.PredictionUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.PredictionCreateOrConnectWithoutPoolInput | Prisma.PredictionCreateOrConnectWithoutPoolInput[];
    upsert?: Prisma.PredictionUpsertWithWhereUniqueWithoutPoolInput | Prisma.PredictionUpsertWithWhereUniqueWithoutPoolInput[];
    createMany?: Prisma.PredictionCreateManyPoolInputEnvelope;
    set?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    disconnect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    delete?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    connect?: Prisma.PredictionWhereUniqueInput | Prisma.PredictionWhereUniqueInput[];
    update?: Prisma.PredictionUpdateWithWhereUniqueWithoutPoolInput | Prisma.PredictionUpdateWithWhereUniqueWithoutPoolInput[];
    updateMany?: Prisma.PredictionUpdateManyWithWhereWithoutPoolInput | Prisma.PredictionUpdateManyWithWhereWithoutPoolInput[];
    deleteMany?: Prisma.PredictionScalarWhereInput | Prisma.PredictionScalarWhereInput[];
};
export type PredictionCreateWithoutUserInput = {
    predictedHomeScore: number;
    predictedAwayScore: number;
    selectedPlayerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pool: Prisma.PoolCreateNestedOneWithoutPredictionsInput;
    fixture: Prisma.FixtureCreateNestedOneWithoutPredictionsInput;
};
export type PredictionUncheckedCreateWithoutUserInput = {
    id?: number;
    poolId: number;
    fixtureId: number;
    predictedHomeScore: number;
    predictedAwayScore: number;
    selectedPlayerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PredictionCreateOrConnectWithoutUserInput = {
    where: Prisma.PredictionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PredictionCreateWithoutUserInput, Prisma.PredictionUncheckedCreateWithoutUserInput>;
};
export type PredictionCreateManyUserInputEnvelope = {
    data: Prisma.PredictionCreateManyUserInput | Prisma.PredictionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PredictionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PredictionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PredictionUpdateWithoutUserInput, Prisma.PredictionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PredictionCreateWithoutUserInput, Prisma.PredictionUncheckedCreateWithoutUserInput>;
};
export type PredictionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PredictionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PredictionUpdateWithoutUserInput, Prisma.PredictionUncheckedUpdateWithoutUserInput>;
};
export type PredictionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PredictionScalarWhereInput;
    data: Prisma.XOR<Prisma.PredictionUpdateManyMutationInput, Prisma.PredictionUncheckedUpdateManyWithoutUserInput>;
};
export type PredictionScalarWhereInput = {
    AND?: Prisma.PredictionScalarWhereInput | Prisma.PredictionScalarWhereInput[];
    OR?: Prisma.PredictionScalarWhereInput[];
    NOT?: Prisma.PredictionScalarWhereInput | Prisma.PredictionScalarWhereInput[];
    id?: Prisma.IntFilter<"Prediction"> | number;
    poolId?: Prisma.IntFilter<"Prediction"> | number;
    userId?: Prisma.IntFilter<"Prediction"> | number;
    fixtureId?: Prisma.IntFilter<"Prediction"> | number;
    predictedHomeScore?: Prisma.IntFilter<"Prediction"> | number;
    predictedAwayScore?: Prisma.IntFilter<"Prediction"> | number;
    selectedPlayerId?: Prisma.IntNullableFilter<"Prediction"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Prediction"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Prediction"> | Date | string;
};
export type PredictionCreateWithoutFixtureInput = {
    predictedHomeScore: number;
    predictedAwayScore: number;
    selectedPlayerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pool: Prisma.PoolCreateNestedOneWithoutPredictionsInput;
    user: Prisma.UserCreateNestedOneWithoutPredictionsInput;
};
export type PredictionUncheckedCreateWithoutFixtureInput = {
    id?: number;
    poolId: number;
    userId: number;
    predictedHomeScore: number;
    predictedAwayScore: number;
    selectedPlayerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PredictionCreateOrConnectWithoutFixtureInput = {
    where: Prisma.PredictionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PredictionCreateWithoutFixtureInput, Prisma.PredictionUncheckedCreateWithoutFixtureInput>;
};
export type PredictionCreateManyFixtureInputEnvelope = {
    data: Prisma.PredictionCreateManyFixtureInput | Prisma.PredictionCreateManyFixtureInput[];
    skipDuplicates?: boolean;
};
export type PredictionUpsertWithWhereUniqueWithoutFixtureInput = {
    where: Prisma.PredictionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PredictionUpdateWithoutFixtureInput, Prisma.PredictionUncheckedUpdateWithoutFixtureInput>;
    create: Prisma.XOR<Prisma.PredictionCreateWithoutFixtureInput, Prisma.PredictionUncheckedCreateWithoutFixtureInput>;
};
export type PredictionUpdateWithWhereUniqueWithoutFixtureInput = {
    where: Prisma.PredictionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PredictionUpdateWithoutFixtureInput, Prisma.PredictionUncheckedUpdateWithoutFixtureInput>;
};
export type PredictionUpdateManyWithWhereWithoutFixtureInput = {
    where: Prisma.PredictionScalarWhereInput;
    data: Prisma.XOR<Prisma.PredictionUpdateManyMutationInput, Prisma.PredictionUncheckedUpdateManyWithoutFixtureInput>;
};
export type PredictionCreateWithoutPoolInput = {
    predictedHomeScore: number;
    predictedAwayScore: number;
    selectedPlayerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPredictionsInput;
    fixture: Prisma.FixtureCreateNestedOneWithoutPredictionsInput;
};
export type PredictionUncheckedCreateWithoutPoolInput = {
    id?: number;
    userId: number;
    fixtureId: number;
    predictedHomeScore: number;
    predictedAwayScore: number;
    selectedPlayerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PredictionCreateOrConnectWithoutPoolInput = {
    where: Prisma.PredictionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PredictionCreateWithoutPoolInput, Prisma.PredictionUncheckedCreateWithoutPoolInput>;
};
export type PredictionCreateManyPoolInputEnvelope = {
    data: Prisma.PredictionCreateManyPoolInput | Prisma.PredictionCreateManyPoolInput[];
    skipDuplicates?: boolean;
};
export type PredictionUpsertWithWhereUniqueWithoutPoolInput = {
    where: Prisma.PredictionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PredictionUpdateWithoutPoolInput, Prisma.PredictionUncheckedUpdateWithoutPoolInput>;
    create: Prisma.XOR<Prisma.PredictionCreateWithoutPoolInput, Prisma.PredictionUncheckedCreateWithoutPoolInput>;
};
export type PredictionUpdateWithWhereUniqueWithoutPoolInput = {
    where: Prisma.PredictionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PredictionUpdateWithoutPoolInput, Prisma.PredictionUncheckedUpdateWithoutPoolInput>;
};
export type PredictionUpdateManyWithWhereWithoutPoolInput = {
    where: Prisma.PredictionScalarWhereInput;
    data: Prisma.XOR<Prisma.PredictionUpdateManyMutationInput, Prisma.PredictionUncheckedUpdateManyWithoutPoolInput>;
};
export type PredictionCreateManyUserInput = {
    id?: number;
    poolId: number;
    fixtureId: number;
    predictedHomeScore: number;
    predictedAwayScore: number;
    selectedPlayerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PredictionUpdateWithoutUserInput = {
    predictedHomeScore?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAwayScore?: Prisma.IntFieldUpdateOperationsInput | number;
    selectedPlayerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pool?: Prisma.PoolUpdateOneRequiredWithoutPredictionsNestedInput;
    fixture?: Prisma.FixtureUpdateOneRequiredWithoutPredictionsNestedInput;
};
export type PredictionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    fixtureId?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedHomeScore?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAwayScore?: Prisma.IntFieldUpdateOperationsInput | number;
    selectedPlayerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PredictionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    fixtureId?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedHomeScore?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAwayScore?: Prisma.IntFieldUpdateOperationsInput | number;
    selectedPlayerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PredictionCreateManyFixtureInput = {
    id?: number;
    poolId: number;
    userId: number;
    predictedHomeScore: number;
    predictedAwayScore: number;
    selectedPlayerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PredictionUpdateWithoutFixtureInput = {
    predictedHomeScore?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAwayScore?: Prisma.IntFieldUpdateOperationsInput | number;
    selectedPlayerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pool?: Prisma.PoolUpdateOneRequiredWithoutPredictionsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutPredictionsNestedInput;
};
export type PredictionUncheckedUpdateWithoutFixtureInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedHomeScore?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAwayScore?: Prisma.IntFieldUpdateOperationsInput | number;
    selectedPlayerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PredictionUncheckedUpdateManyWithoutFixtureInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedHomeScore?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAwayScore?: Prisma.IntFieldUpdateOperationsInput | number;
    selectedPlayerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PredictionCreateManyPoolInput = {
    id?: number;
    userId: number;
    fixtureId: number;
    predictedHomeScore: number;
    predictedAwayScore: number;
    selectedPlayerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PredictionUpdateWithoutPoolInput = {
    predictedHomeScore?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAwayScore?: Prisma.IntFieldUpdateOperationsInput | number;
    selectedPlayerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPredictionsNestedInput;
    fixture?: Prisma.FixtureUpdateOneRequiredWithoutPredictionsNestedInput;
};
export type PredictionUncheckedUpdateWithoutPoolInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    fixtureId?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedHomeScore?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAwayScore?: Prisma.IntFieldUpdateOperationsInput | number;
    selectedPlayerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PredictionUncheckedUpdateManyWithoutPoolInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    fixtureId?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedHomeScore?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAwayScore?: Prisma.IntFieldUpdateOperationsInput | number;
    selectedPlayerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PredictionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    poolId?: boolean;
    userId?: boolean;
    fixtureId?: boolean;
    predictedHomeScore?: boolean;
    predictedAwayScore?: boolean;
    selectedPlayerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pool?: boolean | Prisma.PoolDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    fixture?: boolean | Prisma.FixtureDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["prediction"]>;
export type PredictionSelectScalar = {
    id?: boolean;
    poolId?: boolean;
    userId?: boolean;
    fixtureId?: boolean;
    predictedHomeScore?: boolean;
    predictedAwayScore?: boolean;
    selectedPlayerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PredictionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "poolId" | "userId" | "fixtureId" | "predictedHomeScore" | "predictedAwayScore" | "selectedPlayerId" | "createdAt" | "updatedAt", ExtArgs["result"]["prediction"]>;
export type PredictionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pool?: boolean | Prisma.PoolDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    fixture?: boolean | Prisma.FixtureDefaultArgs<ExtArgs>;
};
export type $PredictionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Prediction";
    objects: {
        pool: Prisma.$PoolPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        fixture: Prisma.$FixturePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        poolId: number;
        userId: number;
        fixtureId: number;
        predictedHomeScore: number;
        predictedAwayScore: number;
        selectedPlayerId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["prediction"]>;
    composites: {};
};
export type PredictionGetPayload<S extends boolean | null | undefined | PredictionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PredictionPayload, S>;
export type PredictionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PredictionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PredictionCountAggregateInputType | true;
};
export interface PredictionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Prediction'];
        meta: {
            name: 'Prediction';
        };
    };
    findUnique<T extends PredictionFindUniqueArgs>(args: Prisma.SelectSubset<T, PredictionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PredictionClient<runtime.Types.Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PredictionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PredictionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PredictionClient<runtime.Types.Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PredictionFindFirstArgs>(args?: Prisma.SelectSubset<T, PredictionFindFirstArgs<ExtArgs>>): Prisma.Prisma__PredictionClient<runtime.Types.Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PredictionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PredictionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PredictionClient<runtime.Types.Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PredictionFindManyArgs>(args?: Prisma.SelectSubset<T, PredictionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PredictionCreateArgs>(args: Prisma.SelectSubset<T, PredictionCreateArgs<ExtArgs>>): Prisma.Prisma__PredictionClient<runtime.Types.Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PredictionCreateManyArgs>(args?: Prisma.SelectSubset<T, PredictionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends PredictionDeleteArgs>(args: Prisma.SelectSubset<T, PredictionDeleteArgs<ExtArgs>>): Prisma.Prisma__PredictionClient<runtime.Types.Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PredictionUpdateArgs>(args: Prisma.SelectSubset<T, PredictionUpdateArgs<ExtArgs>>): Prisma.Prisma__PredictionClient<runtime.Types.Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PredictionDeleteManyArgs>(args?: Prisma.SelectSubset<T, PredictionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PredictionUpdateManyArgs>(args: Prisma.SelectSubset<T, PredictionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends PredictionUpsertArgs>(args: Prisma.SelectSubset<T, PredictionUpsertArgs<ExtArgs>>): Prisma.Prisma__PredictionClient<runtime.Types.Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PredictionCountArgs>(args?: Prisma.Subset<T, PredictionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PredictionCountAggregateOutputType> : number>;
    aggregate<T extends PredictionAggregateArgs>(args: Prisma.Subset<T, PredictionAggregateArgs>): Prisma.PrismaPromise<GetPredictionAggregateType<T>>;
    groupBy<T extends PredictionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PredictionGroupByArgs['orderBy'];
    } : {
        orderBy?: PredictionGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PredictionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPredictionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PredictionFieldRefs;
}
export interface Prisma__PredictionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    pool<T extends Prisma.PoolDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PoolDefaultArgs<ExtArgs>>): Prisma.Prisma__PoolClient<runtime.Types.Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    fixture<T extends Prisma.FixtureDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FixtureDefaultArgs<ExtArgs>>): Prisma.Prisma__FixtureClient<runtime.Types.Result.GetResult<Prisma.$FixturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PredictionFieldRefs {
    readonly id: Prisma.FieldRef<"Prediction", 'Int'>;
    readonly poolId: Prisma.FieldRef<"Prediction", 'Int'>;
    readonly userId: Prisma.FieldRef<"Prediction", 'Int'>;
    readonly fixtureId: Prisma.FieldRef<"Prediction", 'Int'>;
    readonly predictedHomeScore: Prisma.FieldRef<"Prediction", 'Int'>;
    readonly predictedAwayScore: Prisma.FieldRef<"Prediction", 'Int'>;
    readonly selectedPlayerId: Prisma.FieldRef<"Prediction", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Prediction", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Prediction", 'DateTime'>;
}
export type PredictionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PredictionSelect<ExtArgs> | null;
    omit?: Prisma.PredictionOmit<ExtArgs> | null;
    include?: Prisma.PredictionInclude<ExtArgs> | null;
    where: Prisma.PredictionWhereUniqueInput;
};
export type PredictionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PredictionSelect<ExtArgs> | null;
    omit?: Prisma.PredictionOmit<ExtArgs> | null;
    include?: Prisma.PredictionInclude<ExtArgs> | null;
    where: Prisma.PredictionWhereUniqueInput;
};
export type PredictionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PredictionSelect<ExtArgs> | null;
    omit?: Prisma.PredictionOmit<ExtArgs> | null;
    include?: Prisma.PredictionInclude<ExtArgs> | null;
    where?: Prisma.PredictionWhereInput;
    orderBy?: Prisma.PredictionOrderByWithRelationInput | Prisma.PredictionOrderByWithRelationInput[];
    cursor?: Prisma.PredictionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PredictionScalarFieldEnum | Prisma.PredictionScalarFieldEnum[];
};
export type PredictionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PredictionSelect<ExtArgs> | null;
    omit?: Prisma.PredictionOmit<ExtArgs> | null;
    include?: Prisma.PredictionInclude<ExtArgs> | null;
    where?: Prisma.PredictionWhereInput;
    orderBy?: Prisma.PredictionOrderByWithRelationInput | Prisma.PredictionOrderByWithRelationInput[];
    cursor?: Prisma.PredictionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PredictionScalarFieldEnum | Prisma.PredictionScalarFieldEnum[];
};
export type PredictionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PredictionSelect<ExtArgs> | null;
    omit?: Prisma.PredictionOmit<ExtArgs> | null;
    include?: Prisma.PredictionInclude<ExtArgs> | null;
    where?: Prisma.PredictionWhereInput;
    orderBy?: Prisma.PredictionOrderByWithRelationInput | Prisma.PredictionOrderByWithRelationInput[];
    cursor?: Prisma.PredictionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PredictionScalarFieldEnum | Prisma.PredictionScalarFieldEnum[];
};
export type PredictionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PredictionSelect<ExtArgs> | null;
    omit?: Prisma.PredictionOmit<ExtArgs> | null;
    include?: Prisma.PredictionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PredictionCreateInput, Prisma.PredictionUncheckedCreateInput>;
};
export type PredictionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PredictionCreateManyInput | Prisma.PredictionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PredictionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PredictionSelect<ExtArgs> | null;
    omit?: Prisma.PredictionOmit<ExtArgs> | null;
    include?: Prisma.PredictionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PredictionUpdateInput, Prisma.PredictionUncheckedUpdateInput>;
    where: Prisma.PredictionWhereUniqueInput;
};
export type PredictionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PredictionUpdateManyMutationInput, Prisma.PredictionUncheckedUpdateManyInput>;
    where?: Prisma.PredictionWhereInput;
    limit?: number;
};
export type PredictionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PredictionSelect<ExtArgs> | null;
    omit?: Prisma.PredictionOmit<ExtArgs> | null;
    include?: Prisma.PredictionInclude<ExtArgs> | null;
    where: Prisma.PredictionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PredictionCreateInput, Prisma.PredictionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PredictionUpdateInput, Prisma.PredictionUncheckedUpdateInput>;
};
export type PredictionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PredictionSelect<ExtArgs> | null;
    omit?: Prisma.PredictionOmit<ExtArgs> | null;
    include?: Prisma.PredictionInclude<ExtArgs> | null;
    where: Prisma.PredictionWhereUniqueInput;
};
export type PredictionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PredictionWhereInput;
    limit?: number;
};
export type PredictionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PredictionSelect<ExtArgs> | null;
    omit?: Prisma.PredictionOmit<ExtArgs> | null;
    include?: Prisma.PredictionInclude<ExtArgs> | null;
};
