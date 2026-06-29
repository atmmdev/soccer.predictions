import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PointHistoryModel = runtime.Types.Result.DefaultSelection<Prisma.$PointHistoryPayload>;
export type AggregatePointHistory = {
    _count: PointHistoryCountAggregateOutputType | null;
    _avg: PointHistoryAvgAggregateOutputType | null;
    _sum: PointHistorySumAggregateOutputType | null;
    _min: PointHistoryMinAggregateOutputType | null;
    _max: PointHistoryMaxAggregateOutputType | null;
};
export type PointHistoryAvgAggregateOutputType = {
    id: number | null;
    poolId: number | null;
    userId: number | null;
    fixtureId: number | null;
    points: number | null;
};
export type PointHistorySumAggregateOutputType = {
    id: number | null;
    poolId: number | null;
    userId: number | null;
    fixtureId: number | null;
    points: number | null;
};
export type PointHistoryMinAggregateOutputType = {
    id: number | null;
    poolId: number | null;
    userId: number | null;
    fixtureId: number | null;
    points: number | null;
    achievementType: $Enums.ScoringAchievementType | null;
    createdAt: Date | null;
};
export type PointHistoryMaxAggregateOutputType = {
    id: number | null;
    poolId: number | null;
    userId: number | null;
    fixtureId: number | null;
    points: number | null;
    achievementType: $Enums.ScoringAchievementType | null;
    createdAt: Date | null;
};
export type PointHistoryCountAggregateOutputType = {
    id: number;
    poolId: number;
    userId: number;
    fixtureId: number;
    points: number;
    achievementType: number;
    breakdown: number;
    createdAt: number;
    _all: number;
};
export type PointHistoryAvgAggregateInputType = {
    id?: true;
    poolId?: true;
    userId?: true;
    fixtureId?: true;
    points?: true;
};
export type PointHistorySumAggregateInputType = {
    id?: true;
    poolId?: true;
    userId?: true;
    fixtureId?: true;
    points?: true;
};
export type PointHistoryMinAggregateInputType = {
    id?: true;
    poolId?: true;
    userId?: true;
    fixtureId?: true;
    points?: true;
    achievementType?: true;
    createdAt?: true;
};
export type PointHistoryMaxAggregateInputType = {
    id?: true;
    poolId?: true;
    userId?: true;
    fixtureId?: true;
    points?: true;
    achievementType?: true;
    createdAt?: true;
};
export type PointHistoryCountAggregateInputType = {
    id?: true;
    poolId?: true;
    userId?: true;
    fixtureId?: true;
    points?: true;
    achievementType?: true;
    breakdown?: true;
    createdAt?: true;
    _all?: true;
};
export type PointHistoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PointHistoryWhereInput;
    orderBy?: Prisma.PointHistoryOrderByWithRelationInput | Prisma.PointHistoryOrderByWithRelationInput[];
    cursor?: Prisma.PointHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PointHistoryCountAggregateInputType;
    _avg?: PointHistoryAvgAggregateInputType;
    _sum?: PointHistorySumAggregateInputType;
    _min?: PointHistoryMinAggregateInputType;
    _max?: PointHistoryMaxAggregateInputType;
};
export type GetPointHistoryAggregateType<T extends PointHistoryAggregateArgs> = {
    [P in keyof T & keyof AggregatePointHistory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePointHistory[P]> : Prisma.GetScalarType<T[P], AggregatePointHistory[P]>;
};
export type PointHistoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PointHistoryWhereInput;
    orderBy?: Prisma.PointHistoryOrderByWithAggregationInput | Prisma.PointHistoryOrderByWithAggregationInput[];
    by: Prisma.PointHistoryScalarFieldEnum[] | Prisma.PointHistoryScalarFieldEnum;
    having?: Prisma.PointHistoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PointHistoryCountAggregateInputType | true;
    _avg?: PointHistoryAvgAggregateInputType;
    _sum?: PointHistorySumAggregateInputType;
    _min?: PointHistoryMinAggregateInputType;
    _max?: PointHistoryMaxAggregateInputType;
};
export type PointHistoryGroupByOutputType = {
    id: number;
    poolId: number;
    userId: number;
    fixtureId: number;
    points: number;
    achievementType: $Enums.ScoringAchievementType | null;
    breakdown: runtime.JsonValue | null;
    createdAt: Date;
    _count: PointHistoryCountAggregateOutputType | null;
    _avg: PointHistoryAvgAggregateOutputType | null;
    _sum: PointHistorySumAggregateOutputType | null;
    _min: PointHistoryMinAggregateOutputType | null;
    _max: PointHistoryMaxAggregateOutputType | null;
};
export type GetPointHistoryGroupByPayload<T extends PointHistoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PointHistoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PointHistoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PointHistoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PointHistoryGroupByOutputType[P]>;
}>>;
export type PointHistoryWhereInput = {
    AND?: Prisma.PointHistoryWhereInput | Prisma.PointHistoryWhereInput[];
    OR?: Prisma.PointHistoryWhereInput[];
    NOT?: Prisma.PointHistoryWhereInput | Prisma.PointHistoryWhereInput[];
    id?: Prisma.IntFilter<"PointHistory"> | number;
    poolId?: Prisma.IntFilter<"PointHistory"> | number;
    userId?: Prisma.IntFilter<"PointHistory"> | number;
    fixtureId?: Prisma.IntFilter<"PointHistory"> | number;
    points?: Prisma.IntFilter<"PointHistory"> | number;
    achievementType?: Prisma.EnumScoringAchievementTypeNullableFilter<"PointHistory"> | $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.JsonNullableFilter<"PointHistory">;
    createdAt?: Prisma.DateTimeFilter<"PointHistory"> | Date | string;
    pool?: Prisma.XOR<Prisma.PoolScalarRelationFilter, Prisma.PoolWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    fixture?: Prisma.XOR<Prisma.FixtureScalarRelationFilter, Prisma.FixtureWhereInput>;
};
export type PointHistoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fixtureId?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    achievementType?: Prisma.SortOrderInput | Prisma.SortOrder;
    breakdown?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    pool?: Prisma.PoolOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    fixture?: Prisma.FixtureOrderByWithRelationInput;
};
export type PointHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.PointHistoryWhereInput | Prisma.PointHistoryWhereInput[];
    OR?: Prisma.PointHistoryWhereInput[];
    NOT?: Prisma.PointHistoryWhereInput | Prisma.PointHistoryWhereInput[];
    poolId?: Prisma.IntFilter<"PointHistory"> | number;
    userId?: Prisma.IntFilter<"PointHistory"> | number;
    fixtureId?: Prisma.IntFilter<"PointHistory"> | number;
    points?: Prisma.IntFilter<"PointHistory"> | number;
    achievementType?: Prisma.EnumScoringAchievementTypeNullableFilter<"PointHistory"> | $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.JsonNullableFilter<"PointHistory">;
    createdAt?: Prisma.DateTimeFilter<"PointHistory"> | Date | string;
    pool?: Prisma.XOR<Prisma.PoolScalarRelationFilter, Prisma.PoolWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    fixture?: Prisma.XOR<Prisma.FixtureScalarRelationFilter, Prisma.FixtureWhereInput>;
}, "id">;
export type PointHistoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fixtureId?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    achievementType?: Prisma.SortOrderInput | Prisma.SortOrder;
    breakdown?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PointHistoryCountOrderByAggregateInput;
    _avg?: Prisma.PointHistoryAvgOrderByAggregateInput;
    _max?: Prisma.PointHistoryMaxOrderByAggregateInput;
    _min?: Prisma.PointHistoryMinOrderByAggregateInput;
    _sum?: Prisma.PointHistorySumOrderByAggregateInput;
};
export type PointHistoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.PointHistoryScalarWhereWithAggregatesInput | Prisma.PointHistoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.PointHistoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PointHistoryScalarWhereWithAggregatesInput | Prisma.PointHistoryScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"PointHistory"> | number;
    poolId?: Prisma.IntWithAggregatesFilter<"PointHistory"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"PointHistory"> | number;
    fixtureId?: Prisma.IntWithAggregatesFilter<"PointHistory"> | number;
    points?: Prisma.IntWithAggregatesFilter<"PointHistory"> | number;
    achievementType?: Prisma.EnumScoringAchievementTypeNullableWithAggregatesFilter<"PointHistory"> | $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.JsonNullableWithAggregatesFilter<"PointHistory">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PointHistory"> | Date | string;
};
export type PointHistoryCreateInput = {
    points: number;
    achievementType?: $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    pool: Prisma.PoolCreateNestedOneWithoutPointHistoryInput;
    user: Prisma.UserCreateNestedOneWithoutPointHistoryInput;
    fixture: Prisma.FixtureCreateNestedOneWithoutPointHistoryInput;
};
export type PointHistoryUncheckedCreateInput = {
    id?: number;
    poolId: number;
    userId: number;
    fixtureId: number;
    points: number;
    achievementType?: $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type PointHistoryUpdateInput = {
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    achievementType?: Prisma.NullableEnumScoringAchievementTypeFieldUpdateOperationsInput | $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pool?: Prisma.PoolUpdateOneRequiredWithoutPointHistoryNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutPointHistoryNestedInput;
    fixture?: Prisma.FixtureUpdateOneRequiredWithoutPointHistoryNestedInput;
};
export type PointHistoryUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    fixtureId?: Prisma.IntFieldUpdateOperationsInput | number;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    achievementType?: Prisma.NullableEnumScoringAchievementTypeFieldUpdateOperationsInput | $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointHistoryCreateManyInput = {
    id?: number;
    poolId: number;
    userId: number;
    fixtureId: number;
    points: number;
    achievementType?: $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type PointHistoryUpdateManyMutationInput = {
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    achievementType?: Prisma.NullableEnumScoringAchievementTypeFieldUpdateOperationsInput | $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointHistoryUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    fixtureId?: Prisma.IntFieldUpdateOperationsInput | number;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    achievementType?: Prisma.NullableEnumScoringAchievementTypeFieldUpdateOperationsInput | $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointHistoryListRelationFilter = {
    every?: Prisma.PointHistoryWhereInput;
    some?: Prisma.PointHistoryWhereInput;
    none?: Prisma.PointHistoryWhereInput;
};
export type PointHistoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PointHistoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fixtureId?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    achievementType?: Prisma.SortOrder;
    breakdown?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PointHistoryAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fixtureId?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
};
export type PointHistoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fixtureId?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    achievementType?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PointHistoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fixtureId?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    achievementType?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PointHistorySumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fixtureId?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
};
export type PointHistoryCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PointHistoryCreateWithoutUserInput, Prisma.PointHistoryUncheckedCreateWithoutUserInput> | Prisma.PointHistoryCreateWithoutUserInput[] | Prisma.PointHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PointHistoryCreateOrConnectWithoutUserInput | Prisma.PointHistoryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PointHistoryCreateManyUserInputEnvelope;
    connect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
};
export type PointHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PointHistoryCreateWithoutUserInput, Prisma.PointHistoryUncheckedCreateWithoutUserInput> | Prisma.PointHistoryCreateWithoutUserInput[] | Prisma.PointHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PointHistoryCreateOrConnectWithoutUserInput | Prisma.PointHistoryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PointHistoryCreateManyUserInputEnvelope;
    connect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
};
export type PointHistoryUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PointHistoryCreateWithoutUserInput, Prisma.PointHistoryUncheckedCreateWithoutUserInput> | Prisma.PointHistoryCreateWithoutUserInput[] | Prisma.PointHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PointHistoryCreateOrConnectWithoutUserInput | Prisma.PointHistoryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PointHistoryUpsertWithWhereUniqueWithoutUserInput | Prisma.PointHistoryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PointHistoryCreateManyUserInputEnvelope;
    set?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    disconnect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    delete?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    connect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    update?: Prisma.PointHistoryUpdateWithWhereUniqueWithoutUserInput | Prisma.PointHistoryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PointHistoryUpdateManyWithWhereWithoutUserInput | Prisma.PointHistoryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PointHistoryScalarWhereInput | Prisma.PointHistoryScalarWhereInput[];
};
export type PointHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PointHistoryCreateWithoutUserInput, Prisma.PointHistoryUncheckedCreateWithoutUserInput> | Prisma.PointHistoryCreateWithoutUserInput[] | Prisma.PointHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PointHistoryCreateOrConnectWithoutUserInput | Prisma.PointHistoryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PointHistoryUpsertWithWhereUniqueWithoutUserInput | Prisma.PointHistoryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PointHistoryCreateManyUserInputEnvelope;
    set?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    disconnect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    delete?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    connect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    update?: Prisma.PointHistoryUpdateWithWhereUniqueWithoutUserInput | Prisma.PointHistoryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PointHistoryUpdateManyWithWhereWithoutUserInput | Prisma.PointHistoryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PointHistoryScalarWhereInput | Prisma.PointHistoryScalarWhereInput[];
};
export type PointHistoryCreateNestedManyWithoutFixtureInput = {
    create?: Prisma.XOR<Prisma.PointHistoryCreateWithoutFixtureInput, Prisma.PointHistoryUncheckedCreateWithoutFixtureInput> | Prisma.PointHistoryCreateWithoutFixtureInput[] | Prisma.PointHistoryUncheckedCreateWithoutFixtureInput[];
    connectOrCreate?: Prisma.PointHistoryCreateOrConnectWithoutFixtureInput | Prisma.PointHistoryCreateOrConnectWithoutFixtureInput[];
    createMany?: Prisma.PointHistoryCreateManyFixtureInputEnvelope;
    connect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
};
export type PointHistoryUncheckedCreateNestedManyWithoutFixtureInput = {
    create?: Prisma.XOR<Prisma.PointHistoryCreateWithoutFixtureInput, Prisma.PointHistoryUncheckedCreateWithoutFixtureInput> | Prisma.PointHistoryCreateWithoutFixtureInput[] | Prisma.PointHistoryUncheckedCreateWithoutFixtureInput[];
    connectOrCreate?: Prisma.PointHistoryCreateOrConnectWithoutFixtureInput | Prisma.PointHistoryCreateOrConnectWithoutFixtureInput[];
    createMany?: Prisma.PointHistoryCreateManyFixtureInputEnvelope;
    connect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
};
export type PointHistoryUpdateManyWithoutFixtureNestedInput = {
    create?: Prisma.XOR<Prisma.PointHistoryCreateWithoutFixtureInput, Prisma.PointHistoryUncheckedCreateWithoutFixtureInput> | Prisma.PointHistoryCreateWithoutFixtureInput[] | Prisma.PointHistoryUncheckedCreateWithoutFixtureInput[];
    connectOrCreate?: Prisma.PointHistoryCreateOrConnectWithoutFixtureInput | Prisma.PointHistoryCreateOrConnectWithoutFixtureInput[];
    upsert?: Prisma.PointHistoryUpsertWithWhereUniqueWithoutFixtureInput | Prisma.PointHistoryUpsertWithWhereUniqueWithoutFixtureInput[];
    createMany?: Prisma.PointHistoryCreateManyFixtureInputEnvelope;
    set?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    disconnect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    delete?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    connect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    update?: Prisma.PointHistoryUpdateWithWhereUniqueWithoutFixtureInput | Prisma.PointHistoryUpdateWithWhereUniqueWithoutFixtureInput[];
    updateMany?: Prisma.PointHistoryUpdateManyWithWhereWithoutFixtureInput | Prisma.PointHistoryUpdateManyWithWhereWithoutFixtureInput[];
    deleteMany?: Prisma.PointHistoryScalarWhereInput | Prisma.PointHistoryScalarWhereInput[];
};
export type PointHistoryUncheckedUpdateManyWithoutFixtureNestedInput = {
    create?: Prisma.XOR<Prisma.PointHistoryCreateWithoutFixtureInput, Prisma.PointHistoryUncheckedCreateWithoutFixtureInput> | Prisma.PointHistoryCreateWithoutFixtureInput[] | Prisma.PointHistoryUncheckedCreateWithoutFixtureInput[];
    connectOrCreate?: Prisma.PointHistoryCreateOrConnectWithoutFixtureInput | Prisma.PointHistoryCreateOrConnectWithoutFixtureInput[];
    upsert?: Prisma.PointHistoryUpsertWithWhereUniqueWithoutFixtureInput | Prisma.PointHistoryUpsertWithWhereUniqueWithoutFixtureInput[];
    createMany?: Prisma.PointHistoryCreateManyFixtureInputEnvelope;
    set?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    disconnect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    delete?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    connect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    update?: Prisma.PointHistoryUpdateWithWhereUniqueWithoutFixtureInput | Prisma.PointHistoryUpdateWithWhereUniqueWithoutFixtureInput[];
    updateMany?: Prisma.PointHistoryUpdateManyWithWhereWithoutFixtureInput | Prisma.PointHistoryUpdateManyWithWhereWithoutFixtureInput[];
    deleteMany?: Prisma.PointHistoryScalarWhereInput | Prisma.PointHistoryScalarWhereInput[];
};
export type PointHistoryCreateNestedManyWithoutPoolInput = {
    create?: Prisma.XOR<Prisma.PointHistoryCreateWithoutPoolInput, Prisma.PointHistoryUncheckedCreateWithoutPoolInput> | Prisma.PointHistoryCreateWithoutPoolInput[] | Prisma.PointHistoryUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.PointHistoryCreateOrConnectWithoutPoolInput | Prisma.PointHistoryCreateOrConnectWithoutPoolInput[];
    createMany?: Prisma.PointHistoryCreateManyPoolInputEnvelope;
    connect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
};
export type PointHistoryUncheckedCreateNestedManyWithoutPoolInput = {
    create?: Prisma.XOR<Prisma.PointHistoryCreateWithoutPoolInput, Prisma.PointHistoryUncheckedCreateWithoutPoolInput> | Prisma.PointHistoryCreateWithoutPoolInput[] | Prisma.PointHistoryUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.PointHistoryCreateOrConnectWithoutPoolInput | Prisma.PointHistoryCreateOrConnectWithoutPoolInput[];
    createMany?: Prisma.PointHistoryCreateManyPoolInputEnvelope;
    connect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
};
export type PointHistoryUpdateManyWithoutPoolNestedInput = {
    create?: Prisma.XOR<Prisma.PointHistoryCreateWithoutPoolInput, Prisma.PointHistoryUncheckedCreateWithoutPoolInput> | Prisma.PointHistoryCreateWithoutPoolInput[] | Prisma.PointHistoryUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.PointHistoryCreateOrConnectWithoutPoolInput | Prisma.PointHistoryCreateOrConnectWithoutPoolInput[];
    upsert?: Prisma.PointHistoryUpsertWithWhereUniqueWithoutPoolInput | Prisma.PointHistoryUpsertWithWhereUniqueWithoutPoolInput[];
    createMany?: Prisma.PointHistoryCreateManyPoolInputEnvelope;
    set?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    disconnect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    delete?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    connect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    update?: Prisma.PointHistoryUpdateWithWhereUniqueWithoutPoolInput | Prisma.PointHistoryUpdateWithWhereUniqueWithoutPoolInput[];
    updateMany?: Prisma.PointHistoryUpdateManyWithWhereWithoutPoolInput | Prisma.PointHistoryUpdateManyWithWhereWithoutPoolInput[];
    deleteMany?: Prisma.PointHistoryScalarWhereInput | Prisma.PointHistoryScalarWhereInput[];
};
export type PointHistoryUncheckedUpdateManyWithoutPoolNestedInput = {
    create?: Prisma.XOR<Prisma.PointHistoryCreateWithoutPoolInput, Prisma.PointHistoryUncheckedCreateWithoutPoolInput> | Prisma.PointHistoryCreateWithoutPoolInput[] | Prisma.PointHistoryUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.PointHistoryCreateOrConnectWithoutPoolInput | Prisma.PointHistoryCreateOrConnectWithoutPoolInput[];
    upsert?: Prisma.PointHistoryUpsertWithWhereUniqueWithoutPoolInput | Prisma.PointHistoryUpsertWithWhereUniqueWithoutPoolInput[];
    createMany?: Prisma.PointHistoryCreateManyPoolInputEnvelope;
    set?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    disconnect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    delete?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    connect?: Prisma.PointHistoryWhereUniqueInput | Prisma.PointHistoryWhereUniqueInput[];
    update?: Prisma.PointHistoryUpdateWithWhereUniqueWithoutPoolInput | Prisma.PointHistoryUpdateWithWhereUniqueWithoutPoolInput[];
    updateMany?: Prisma.PointHistoryUpdateManyWithWhereWithoutPoolInput | Prisma.PointHistoryUpdateManyWithWhereWithoutPoolInput[];
    deleteMany?: Prisma.PointHistoryScalarWhereInput | Prisma.PointHistoryScalarWhereInput[];
};
export type NullableEnumScoringAchievementTypeFieldUpdateOperationsInput = {
    set?: $Enums.ScoringAchievementType | null;
};
export type PointHistoryCreateWithoutUserInput = {
    points: number;
    achievementType?: $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    pool: Prisma.PoolCreateNestedOneWithoutPointHistoryInput;
    fixture: Prisma.FixtureCreateNestedOneWithoutPointHistoryInput;
};
export type PointHistoryUncheckedCreateWithoutUserInput = {
    id?: number;
    poolId: number;
    fixtureId: number;
    points: number;
    achievementType?: $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type PointHistoryCreateOrConnectWithoutUserInput = {
    where: Prisma.PointHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.PointHistoryCreateWithoutUserInput, Prisma.PointHistoryUncheckedCreateWithoutUserInput>;
};
export type PointHistoryCreateManyUserInputEnvelope = {
    data: Prisma.PointHistoryCreateManyUserInput | Prisma.PointHistoryCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PointHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PointHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.PointHistoryUpdateWithoutUserInput, Prisma.PointHistoryUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PointHistoryCreateWithoutUserInput, Prisma.PointHistoryUncheckedCreateWithoutUserInput>;
};
export type PointHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PointHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.PointHistoryUpdateWithoutUserInput, Prisma.PointHistoryUncheckedUpdateWithoutUserInput>;
};
export type PointHistoryUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PointHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.PointHistoryUpdateManyMutationInput, Prisma.PointHistoryUncheckedUpdateManyWithoutUserInput>;
};
export type PointHistoryScalarWhereInput = {
    AND?: Prisma.PointHistoryScalarWhereInput | Prisma.PointHistoryScalarWhereInput[];
    OR?: Prisma.PointHistoryScalarWhereInput[];
    NOT?: Prisma.PointHistoryScalarWhereInput | Prisma.PointHistoryScalarWhereInput[];
    id?: Prisma.IntFilter<"PointHistory"> | number;
    poolId?: Prisma.IntFilter<"PointHistory"> | number;
    userId?: Prisma.IntFilter<"PointHistory"> | number;
    fixtureId?: Prisma.IntFilter<"PointHistory"> | number;
    points?: Prisma.IntFilter<"PointHistory"> | number;
    achievementType?: Prisma.EnumScoringAchievementTypeNullableFilter<"PointHistory"> | $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.JsonNullableFilter<"PointHistory">;
    createdAt?: Prisma.DateTimeFilter<"PointHistory"> | Date | string;
};
export type PointHistoryCreateWithoutFixtureInput = {
    points: number;
    achievementType?: $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    pool: Prisma.PoolCreateNestedOneWithoutPointHistoryInput;
    user: Prisma.UserCreateNestedOneWithoutPointHistoryInput;
};
export type PointHistoryUncheckedCreateWithoutFixtureInput = {
    id?: number;
    poolId: number;
    userId: number;
    points: number;
    achievementType?: $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type PointHistoryCreateOrConnectWithoutFixtureInput = {
    where: Prisma.PointHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.PointHistoryCreateWithoutFixtureInput, Prisma.PointHistoryUncheckedCreateWithoutFixtureInput>;
};
export type PointHistoryCreateManyFixtureInputEnvelope = {
    data: Prisma.PointHistoryCreateManyFixtureInput | Prisma.PointHistoryCreateManyFixtureInput[];
    skipDuplicates?: boolean;
};
export type PointHistoryUpsertWithWhereUniqueWithoutFixtureInput = {
    where: Prisma.PointHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.PointHistoryUpdateWithoutFixtureInput, Prisma.PointHistoryUncheckedUpdateWithoutFixtureInput>;
    create: Prisma.XOR<Prisma.PointHistoryCreateWithoutFixtureInput, Prisma.PointHistoryUncheckedCreateWithoutFixtureInput>;
};
export type PointHistoryUpdateWithWhereUniqueWithoutFixtureInput = {
    where: Prisma.PointHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.PointHistoryUpdateWithoutFixtureInput, Prisma.PointHistoryUncheckedUpdateWithoutFixtureInput>;
};
export type PointHistoryUpdateManyWithWhereWithoutFixtureInput = {
    where: Prisma.PointHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.PointHistoryUpdateManyMutationInput, Prisma.PointHistoryUncheckedUpdateManyWithoutFixtureInput>;
};
export type PointHistoryCreateWithoutPoolInput = {
    points: number;
    achievementType?: $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPointHistoryInput;
    fixture: Prisma.FixtureCreateNestedOneWithoutPointHistoryInput;
};
export type PointHistoryUncheckedCreateWithoutPoolInput = {
    id?: number;
    userId: number;
    fixtureId: number;
    points: number;
    achievementType?: $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type PointHistoryCreateOrConnectWithoutPoolInput = {
    where: Prisma.PointHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.PointHistoryCreateWithoutPoolInput, Prisma.PointHistoryUncheckedCreateWithoutPoolInput>;
};
export type PointHistoryCreateManyPoolInputEnvelope = {
    data: Prisma.PointHistoryCreateManyPoolInput | Prisma.PointHistoryCreateManyPoolInput[];
    skipDuplicates?: boolean;
};
export type PointHistoryUpsertWithWhereUniqueWithoutPoolInput = {
    where: Prisma.PointHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.PointHistoryUpdateWithoutPoolInput, Prisma.PointHistoryUncheckedUpdateWithoutPoolInput>;
    create: Prisma.XOR<Prisma.PointHistoryCreateWithoutPoolInput, Prisma.PointHistoryUncheckedCreateWithoutPoolInput>;
};
export type PointHistoryUpdateWithWhereUniqueWithoutPoolInput = {
    where: Prisma.PointHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.PointHistoryUpdateWithoutPoolInput, Prisma.PointHistoryUncheckedUpdateWithoutPoolInput>;
};
export type PointHistoryUpdateManyWithWhereWithoutPoolInput = {
    where: Prisma.PointHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.PointHistoryUpdateManyMutationInput, Prisma.PointHistoryUncheckedUpdateManyWithoutPoolInput>;
};
export type PointHistoryCreateManyUserInput = {
    id?: number;
    poolId: number;
    fixtureId: number;
    points: number;
    achievementType?: $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type PointHistoryUpdateWithoutUserInput = {
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    achievementType?: Prisma.NullableEnumScoringAchievementTypeFieldUpdateOperationsInput | $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pool?: Prisma.PoolUpdateOneRequiredWithoutPointHistoryNestedInput;
    fixture?: Prisma.FixtureUpdateOneRequiredWithoutPointHistoryNestedInput;
};
export type PointHistoryUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    fixtureId?: Prisma.IntFieldUpdateOperationsInput | number;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    achievementType?: Prisma.NullableEnumScoringAchievementTypeFieldUpdateOperationsInput | $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    fixtureId?: Prisma.IntFieldUpdateOperationsInput | number;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    achievementType?: Prisma.NullableEnumScoringAchievementTypeFieldUpdateOperationsInput | $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointHistoryCreateManyFixtureInput = {
    id?: number;
    poolId: number;
    userId: number;
    points: number;
    achievementType?: $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type PointHistoryUpdateWithoutFixtureInput = {
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    achievementType?: Prisma.NullableEnumScoringAchievementTypeFieldUpdateOperationsInput | $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pool?: Prisma.PoolUpdateOneRequiredWithoutPointHistoryNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutPointHistoryNestedInput;
};
export type PointHistoryUncheckedUpdateWithoutFixtureInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    achievementType?: Prisma.NullableEnumScoringAchievementTypeFieldUpdateOperationsInput | $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointHistoryUncheckedUpdateManyWithoutFixtureInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    achievementType?: Prisma.NullableEnumScoringAchievementTypeFieldUpdateOperationsInput | $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointHistoryCreateManyPoolInput = {
    id?: number;
    userId: number;
    fixtureId: number;
    points: number;
    achievementType?: $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type PointHistoryUpdateWithoutPoolInput = {
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    achievementType?: Prisma.NullableEnumScoringAchievementTypeFieldUpdateOperationsInput | $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPointHistoryNestedInput;
    fixture?: Prisma.FixtureUpdateOneRequiredWithoutPointHistoryNestedInput;
};
export type PointHistoryUncheckedUpdateWithoutPoolInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    fixtureId?: Prisma.IntFieldUpdateOperationsInput | number;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    achievementType?: Prisma.NullableEnumScoringAchievementTypeFieldUpdateOperationsInput | $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointHistoryUncheckedUpdateManyWithoutPoolInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    fixtureId?: Prisma.IntFieldUpdateOperationsInput | number;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    achievementType?: Prisma.NullableEnumScoringAchievementTypeFieldUpdateOperationsInput | $Enums.ScoringAchievementType | null;
    breakdown?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointHistorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    poolId?: boolean;
    userId?: boolean;
    fixtureId?: boolean;
    points?: boolean;
    achievementType?: boolean;
    breakdown?: boolean;
    createdAt?: boolean;
    pool?: boolean | Prisma.PoolDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    fixture?: boolean | Prisma.FixtureDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pointHistory"]>;
export type PointHistorySelectScalar = {
    id?: boolean;
    poolId?: boolean;
    userId?: boolean;
    fixtureId?: boolean;
    points?: boolean;
    achievementType?: boolean;
    breakdown?: boolean;
    createdAt?: boolean;
};
export type PointHistoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "poolId" | "userId" | "fixtureId" | "points" | "achievementType" | "breakdown" | "createdAt", ExtArgs["result"]["pointHistory"]>;
export type PointHistoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pool?: boolean | Prisma.PoolDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    fixture?: boolean | Prisma.FixtureDefaultArgs<ExtArgs>;
};
export type $PointHistoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PointHistory";
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
        points: number;
        achievementType: $Enums.ScoringAchievementType | null;
        breakdown: runtime.JsonValue | null;
        createdAt: Date;
    }, ExtArgs["result"]["pointHistory"]>;
    composites: {};
};
export type PointHistoryGetPayload<S extends boolean | null | undefined | PointHistoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PointHistoryPayload, S>;
export type PointHistoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PointHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PointHistoryCountAggregateInputType | true;
};
export interface PointHistoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PointHistory'];
        meta: {
            name: 'PointHistory';
        };
    };
    findUnique<T extends PointHistoryFindUniqueArgs>(args: Prisma.SelectSubset<T, PointHistoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PointHistoryClient<runtime.Types.Result.GetResult<Prisma.$PointHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PointHistoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PointHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PointHistoryClient<runtime.Types.Result.GetResult<Prisma.$PointHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PointHistoryFindFirstArgs>(args?: Prisma.SelectSubset<T, PointHistoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__PointHistoryClient<runtime.Types.Result.GetResult<Prisma.$PointHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PointHistoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PointHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PointHistoryClient<runtime.Types.Result.GetResult<Prisma.$PointHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PointHistoryFindManyArgs>(args?: Prisma.SelectSubset<T, PointHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PointHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PointHistoryCreateArgs>(args: Prisma.SelectSubset<T, PointHistoryCreateArgs<ExtArgs>>): Prisma.Prisma__PointHistoryClient<runtime.Types.Result.GetResult<Prisma.$PointHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PointHistoryCreateManyArgs>(args?: Prisma.SelectSubset<T, PointHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends PointHistoryDeleteArgs>(args: Prisma.SelectSubset<T, PointHistoryDeleteArgs<ExtArgs>>): Prisma.Prisma__PointHistoryClient<runtime.Types.Result.GetResult<Prisma.$PointHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PointHistoryUpdateArgs>(args: Prisma.SelectSubset<T, PointHistoryUpdateArgs<ExtArgs>>): Prisma.Prisma__PointHistoryClient<runtime.Types.Result.GetResult<Prisma.$PointHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PointHistoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, PointHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PointHistoryUpdateManyArgs>(args: Prisma.SelectSubset<T, PointHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends PointHistoryUpsertArgs>(args: Prisma.SelectSubset<T, PointHistoryUpsertArgs<ExtArgs>>): Prisma.Prisma__PointHistoryClient<runtime.Types.Result.GetResult<Prisma.$PointHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PointHistoryCountArgs>(args?: Prisma.Subset<T, PointHistoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PointHistoryCountAggregateOutputType> : number>;
    aggregate<T extends PointHistoryAggregateArgs>(args: Prisma.Subset<T, PointHistoryAggregateArgs>): Prisma.PrismaPromise<GetPointHistoryAggregateType<T>>;
    groupBy<T extends PointHistoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PointHistoryGroupByArgs['orderBy'];
    } : {
        orderBy?: PointHistoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PointHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPointHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PointHistoryFieldRefs;
}
export interface Prisma__PointHistoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    pool<T extends Prisma.PoolDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PoolDefaultArgs<ExtArgs>>): Prisma.Prisma__PoolClient<runtime.Types.Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    fixture<T extends Prisma.FixtureDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FixtureDefaultArgs<ExtArgs>>): Prisma.Prisma__FixtureClient<runtime.Types.Result.GetResult<Prisma.$FixturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PointHistoryFieldRefs {
    readonly id: Prisma.FieldRef<"PointHistory", 'Int'>;
    readonly poolId: Prisma.FieldRef<"PointHistory", 'Int'>;
    readonly userId: Prisma.FieldRef<"PointHistory", 'Int'>;
    readonly fixtureId: Prisma.FieldRef<"PointHistory", 'Int'>;
    readonly points: Prisma.FieldRef<"PointHistory", 'Int'>;
    readonly achievementType: Prisma.FieldRef<"PointHistory", 'ScoringAchievementType'>;
    readonly breakdown: Prisma.FieldRef<"PointHistory", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"PointHistory", 'DateTime'>;
}
export type PointHistoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointHistorySelect<ExtArgs> | null;
    omit?: Prisma.PointHistoryOmit<ExtArgs> | null;
    include?: Prisma.PointHistoryInclude<ExtArgs> | null;
    where: Prisma.PointHistoryWhereUniqueInput;
};
export type PointHistoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointHistorySelect<ExtArgs> | null;
    omit?: Prisma.PointHistoryOmit<ExtArgs> | null;
    include?: Prisma.PointHistoryInclude<ExtArgs> | null;
    where: Prisma.PointHistoryWhereUniqueInput;
};
export type PointHistoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointHistorySelect<ExtArgs> | null;
    omit?: Prisma.PointHistoryOmit<ExtArgs> | null;
    include?: Prisma.PointHistoryInclude<ExtArgs> | null;
    where?: Prisma.PointHistoryWhereInput;
    orderBy?: Prisma.PointHistoryOrderByWithRelationInput | Prisma.PointHistoryOrderByWithRelationInput[];
    cursor?: Prisma.PointHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PointHistoryScalarFieldEnum | Prisma.PointHistoryScalarFieldEnum[];
};
export type PointHistoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointHistorySelect<ExtArgs> | null;
    omit?: Prisma.PointHistoryOmit<ExtArgs> | null;
    include?: Prisma.PointHistoryInclude<ExtArgs> | null;
    where?: Prisma.PointHistoryWhereInput;
    orderBy?: Prisma.PointHistoryOrderByWithRelationInput | Prisma.PointHistoryOrderByWithRelationInput[];
    cursor?: Prisma.PointHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PointHistoryScalarFieldEnum | Prisma.PointHistoryScalarFieldEnum[];
};
export type PointHistoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointHistorySelect<ExtArgs> | null;
    omit?: Prisma.PointHistoryOmit<ExtArgs> | null;
    include?: Prisma.PointHistoryInclude<ExtArgs> | null;
    where?: Prisma.PointHistoryWhereInput;
    orderBy?: Prisma.PointHistoryOrderByWithRelationInput | Prisma.PointHistoryOrderByWithRelationInput[];
    cursor?: Prisma.PointHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PointHistoryScalarFieldEnum | Prisma.PointHistoryScalarFieldEnum[];
};
export type PointHistoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointHistorySelect<ExtArgs> | null;
    omit?: Prisma.PointHistoryOmit<ExtArgs> | null;
    include?: Prisma.PointHistoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PointHistoryCreateInput, Prisma.PointHistoryUncheckedCreateInput>;
};
export type PointHistoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PointHistoryCreateManyInput | Prisma.PointHistoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PointHistoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointHistorySelect<ExtArgs> | null;
    omit?: Prisma.PointHistoryOmit<ExtArgs> | null;
    include?: Prisma.PointHistoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PointHistoryUpdateInput, Prisma.PointHistoryUncheckedUpdateInput>;
    where: Prisma.PointHistoryWhereUniqueInput;
};
export type PointHistoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PointHistoryUpdateManyMutationInput, Prisma.PointHistoryUncheckedUpdateManyInput>;
    where?: Prisma.PointHistoryWhereInput;
    limit?: number;
};
export type PointHistoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointHistorySelect<ExtArgs> | null;
    omit?: Prisma.PointHistoryOmit<ExtArgs> | null;
    include?: Prisma.PointHistoryInclude<ExtArgs> | null;
    where: Prisma.PointHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.PointHistoryCreateInput, Prisma.PointHistoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PointHistoryUpdateInput, Prisma.PointHistoryUncheckedUpdateInput>;
};
export type PointHistoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointHistorySelect<ExtArgs> | null;
    omit?: Prisma.PointHistoryOmit<ExtArgs> | null;
    include?: Prisma.PointHistoryInclude<ExtArgs> | null;
    where: Prisma.PointHistoryWhereUniqueInput;
};
export type PointHistoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PointHistoryWhereInput;
    limit?: number;
};
export type PointHistoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointHistorySelect<ExtArgs> | null;
    omit?: Prisma.PointHistoryOmit<ExtArgs> | null;
    include?: Prisma.PointHistoryInclude<ExtArgs> | null;
};
