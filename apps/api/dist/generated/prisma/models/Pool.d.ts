import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PoolModel = runtime.Types.Result.DefaultSelection<Prisma.$PoolPayload>;
export type AggregatePool = {
    _count: PoolCountAggregateOutputType | null;
    _avg: PoolAvgAggregateOutputType | null;
    _sum: PoolSumAggregateOutputType | null;
    _min: PoolMinAggregateOutputType | null;
    _max: PoolMaxAggregateOutputType | null;
};
export type PoolAvgAggregateOutputType = {
    id: number | null;
    ownerId: number | null;
    championshipId: number | null;
};
export type PoolSumAggregateOutputType = {
    id: number | null;
    ownerId: number | null;
    championshipId: number | null;
};
export type PoolMinAggregateOutputType = {
    id: number | null;
    ownerId: number | null;
    championshipId: number | null;
    name: string | null;
    inviteCode: string | null;
    status: $Enums.PoolStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PoolMaxAggregateOutputType = {
    id: number | null;
    ownerId: number | null;
    championshipId: number | null;
    name: string | null;
    inviteCode: string | null;
    status: $Enums.PoolStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PoolCountAggregateOutputType = {
    id: number;
    ownerId: number;
    championshipId: number;
    name: number;
    inviteCode: number;
    status: number;
    scoring: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PoolAvgAggregateInputType = {
    id?: true;
    ownerId?: true;
    championshipId?: true;
};
export type PoolSumAggregateInputType = {
    id?: true;
    ownerId?: true;
    championshipId?: true;
};
export type PoolMinAggregateInputType = {
    id?: true;
    ownerId?: true;
    championshipId?: true;
    name?: true;
    inviteCode?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PoolMaxAggregateInputType = {
    id?: true;
    ownerId?: true;
    championshipId?: true;
    name?: true;
    inviteCode?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PoolCountAggregateInputType = {
    id?: true;
    ownerId?: true;
    championshipId?: true;
    name?: true;
    inviteCode?: true;
    status?: true;
    scoring?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PoolAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PoolWhereInput;
    orderBy?: Prisma.PoolOrderByWithRelationInput | Prisma.PoolOrderByWithRelationInput[];
    cursor?: Prisma.PoolWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PoolCountAggregateInputType;
    _avg?: PoolAvgAggregateInputType;
    _sum?: PoolSumAggregateInputType;
    _min?: PoolMinAggregateInputType;
    _max?: PoolMaxAggregateInputType;
};
export type GetPoolAggregateType<T extends PoolAggregateArgs> = {
    [P in keyof T & keyof AggregatePool]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePool[P]> : Prisma.GetScalarType<T[P], AggregatePool[P]>;
};
export type PoolGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PoolWhereInput;
    orderBy?: Prisma.PoolOrderByWithAggregationInput | Prisma.PoolOrderByWithAggregationInput[];
    by: Prisma.PoolScalarFieldEnum[] | Prisma.PoolScalarFieldEnum;
    having?: Prisma.PoolScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PoolCountAggregateInputType | true;
    _avg?: PoolAvgAggregateInputType;
    _sum?: PoolSumAggregateInputType;
    _min?: PoolMinAggregateInputType;
    _max?: PoolMaxAggregateInputType;
};
export type PoolGroupByOutputType = {
    id: number;
    ownerId: number;
    championshipId: number;
    name: string;
    inviteCode: string;
    status: $Enums.PoolStatus;
    scoring: runtime.JsonValue;
    createdAt: Date;
    updatedAt: Date;
    _count: PoolCountAggregateOutputType | null;
    _avg: PoolAvgAggregateOutputType | null;
    _sum: PoolSumAggregateOutputType | null;
    _min: PoolMinAggregateOutputType | null;
    _max: PoolMaxAggregateOutputType | null;
};
export type GetPoolGroupByPayload<T extends PoolGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PoolGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PoolGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PoolGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PoolGroupByOutputType[P]>;
}>>;
export type PoolWhereInput = {
    AND?: Prisma.PoolWhereInput | Prisma.PoolWhereInput[];
    OR?: Prisma.PoolWhereInput[];
    NOT?: Prisma.PoolWhereInput | Prisma.PoolWhereInput[];
    id?: Prisma.IntFilter<"Pool"> | number;
    ownerId?: Prisma.IntFilter<"Pool"> | number;
    championshipId?: Prisma.IntFilter<"Pool"> | number;
    name?: Prisma.StringFilter<"Pool"> | string;
    inviteCode?: Prisma.StringFilter<"Pool"> | string;
    status?: Prisma.EnumPoolStatusFilter<"Pool"> | $Enums.PoolStatus;
    scoring?: Prisma.JsonFilter<"Pool">;
    createdAt?: Prisma.DateTimeFilter<"Pool"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Pool"> | Date | string;
    owner?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    championship?: Prisma.XOR<Prisma.ChampionshipScalarRelationFilter, Prisma.ChampionshipWhereInput>;
    poolUsers?: Prisma.PoolUserListRelationFilter;
    invitations?: Prisma.InvitationListRelationFilter;
    predictions?: Prisma.PredictionListRelationFilter;
    pointHistory?: Prisma.PointHistoryListRelationFilter;
};
export type PoolOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    championshipId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    inviteCode?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    scoring?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    owner?: Prisma.UserOrderByWithRelationInput;
    championship?: Prisma.ChampionshipOrderByWithRelationInput;
    poolUsers?: Prisma.PoolUserOrderByRelationAggregateInput;
    invitations?: Prisma.InvitationOrderByRelationAggregateInput;
    predictions?: Prisma.PredictionOrderByRelationAggregateInput;
    pointHistory?: Prisma.PointHistoryOrderByRelationAggregateInput;
    _relevance?: Prisma.PoolOrderByRelevanceInput;
};
export type PoolWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    inviteCode?: string;
    AND?: Prisma.PoolWhereInput | Prisma.PoolWhereInput[];
    OR?: Prisma.PoolWhereInput[];
    NOT?: Prisma.PoolWhereInput | Prisma.PoolWhereInput[];
    ownerId?: Prisma.IntFilter<"Pool"> | number;
    championshipId?: Prisma.IntFilter<"Pool"> | number;
    name?: Prisma.StringFilter<"Pool"> | string;
    status?: Prisma.EnumPoolStatusFilter<"Pool"> | $Enums.PoolStatus;
    scoring?: Prisma.JsonFilter<"Pool">;
    createdAt?: Prisma.DateTimeFilter<"Pool"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Pool"> | Date | string;
    owner?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    championship?: Prisma.XOR<Prisma.ChampionshipScalarRelationFilter, Prisma.ChampionshipWhereInput>;
    poolUsers?: Prisma.PoolUserListRelationFilter;
    invitations?: Prisma.InvitationListRelationFilter;
    predictions?: Prisma.PredictionListRelationFilter;
    pointHistory?: Prisma.PointHistoryListRelationFilter;
}, "id" | "inviteCode">;
export type PoolOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    championshipId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    inviteCode?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    scoring?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PoolCountOrderByAggregateInput;
    _avg?: Prisma.PoolAvgOrderByAggregateInput;
    _max?: Prisma.PoolMaxOrderByAggregateInput;
    _min?: Prisma.PoolMinOrderByAggregateInput;
    _sum?: Prisma.PoolSumOrderByAggregateInput;
};
export type PoolScalarWhereWithAggregatesInput = {
    AND?: Prisma.PoolScalarWhereWithAggregatesInput | Prisma.PoolScalarWhereWithAggregatesInput[];
    OR?: Prisma.PoolScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PoolScalarWhereWithAggregatesInput | Prisma.PoolScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Pool"> | number;
    ownerId?: Prisma.IntWithAggregatesFilter<"Pool"> | number;
    championshipId?: Prisma.IntWithAggregatesFilter<"Pool"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Pool"> | string;
    inviteCode?: Prisma.StringWithAggregatesFilter<"Pool"> | string;
    status?: Prisma.EnumPoolStatusWithAggregatesFilter<"Pool"> | $Enums.PoolStatus;
    scoring?: Prisma.JsonWithAggregatesFilter<"Pool">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Pool"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Pool"> | Date | string;
};
export type PoolCreateInput = {
    name: string;
    inviteCode: string;
    status?: $Enums.PoolStatus;
    scoring: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner: Prisma.UserCreateNestedOneWithoutOwnedPoolsInput;
    championship: Prisma.ChampionshipCreateNestedOneWithoutPoolsInput;
    poolUsers?: Prisma.PoolUserCreateNestedManyWithoutPoolInput;
    invitations?: Prisma.InvitationCreateNestedManyWithoutPoolInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutPoolInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutPoolInput;
};
export type PoolUncheckedCreateInput = {
    id?: number;
    ownerId: number;
    championshipId: number;
    name: string;
    inviteCode: string;
    status?: $Enums.PoolStatus;
    scoring: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserUncheckedCreateNestedManyWithoutPoolInput;
    invitations?: Prisma.InvitationUncheckedCreateNestedManyWithoutPoolInput;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutPoolInput;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutPoolInput;
};
export type PoolUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneRequiredWithoutOwnedPoolsNestedInput;
    championship?: Prisma.ChampionshipUpdateOneRequiredWithoutPoolsNestedInput;
    poolUsers?: Prisma.PoolUserUpdateManyWithoutPoolNestedInput;
    invitations?: Prisma.InvitationUpdateManyWithoutPoolNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutPoolNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutPoolNestedInput;
};
export type PoolUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ownerId?: Prisma.IntFieldUpdateOperationsInput | number;
    championshipId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUncheckedUpdateManyWithoutPoolNestedInput;
    invitations?: Prisma.InvitationUncheckedUpdateManyWithoutPoolNestedInput;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutPoolNestedInput;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutPoolNestedInput;
};
export type PoolCreateManyInput = {
    id?: number;
    ownerId: number;
    championshipId: number;
    name: string;
    inviteCode: string;
    status?: $Enums.PoolStatus;
    scoring: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PoolUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PoolUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ownerId?: Prisma.IntFieldUpdateOperationsInput | number;
    championshipId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PoolListRelationFilter = {
    every?: Prisma.PoolWhereInput;
    some?: Prisma.PoolWhereInput;
    none?: Prisma.PoolWhereInput;
};
export type PoolOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PoolOrderByRelevanceInput = {
    fields: Prisma.PoolOrderByRelevanceFieldEnum | Prisma.PoolOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type PoolCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    championshipId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    inviteCode?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    scoring?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PoolAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    championshipId?: Prisma.SortOrder;
};
export type PoolMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    championshipId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    inviteCode?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PoolMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    championshipId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    inviteCode?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PoolSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    championshipId?: Prisma.SortOrder;
};
export type PoolScalarRelationFilter = {
    is?: Prisma.PoolWhereInput;
    isNot?: Prisma.PoolWhereInput;
};
export type PoolCreateNestedManyWithoutOwnerInput = {
    create?: Prisma.XOR<Prisma.PoolCreateWithoutOwnerInput, Prisma.PoolUncheckedCreateWithoutOwnerInput> | Prisma.PoolCreateWithoutOwnerInput[] | Prisma.PoolUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.PoolCreateOrConnectWithoutOwnerInput | Prisma.PoolCreateOrConnectWithoutOwnerInput[];
    createMany?: Prisma.PoolCreateManyOwnerInputEnvelope;
    connect?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
};
export type PoolUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: Prisma.XOR<Prisma.PoolCreateWithoutOwnerInput, Prisma.PoolUncheckedCreateWithoutOwnerInput> | Prisma.PoolCreateWithoutOwnerInput[] | Prisma.PoolUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.PoolCreateOrConnectWithoutOwnerInput | Prisma.PoolCreateOrConnectWithoutOwnerInput[];
    createMany?: Prisma.PoolCreateManyOwnerInputEnvelope;
    connect?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
};
export type PoolUpdateManyWithoutOwnerNestedInput = {
    create?: Prisma.XOR<Prisma.PoolCreateWithoutOwnerInput, Prisma.PoolUncheckedCreateWithoutOwnerInput> | Prisma.PoolCreateWithoutOwnerInput[] | Prisma.PoolUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.PoolCreateOrConnectWithoutOwnerInput | Prisma.PoolCreateOrConnectWithoutOwnerInput[];
    upsert?: Prisma.PoolUpsertWithWhereUniqueWithoutOwnerInput | Prisma.PoolUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: Prisma.PoolCreateManyOwnerInputEnvelope;
    set?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
    disconnect?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
    delete?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
    connect?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
    update?: Prisma.PoolUpdateWithWhereUniqueWithoutOwnerInput | Prisma.PoolUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: Prisma.PoolUpdateManyWithWhereWithoutOwnerInput | Prisma.PoolUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: Prisma.PoolScalarWhereInput | Prisma.PoolScalarWhereInput[];
};
export type PoolUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: Prisma.XOR<Prisma.PoolCreateWithoutOwnerInput, Prisma.PoolUncheckedCreateWithoutOwnerInput> | Prisma.PoolCreateWithoutOwnerInput[] | Prisma.PoolUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.PoolCreateOrConnectWithoutOwnerInput | Prisma.PoolCreateOrConnectWithoutOwnerInput[];
    upsert?: Prisma.PoolUpsertWithWhereUniqueWithoutOwnerInput | Prisma.PoolUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: Prisma.PoolCreateManyOwnerInputEnvelope;
    set?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
    disconnect?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
    delete?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
    connect?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
    update?: Prisma.PoolUpdateWithWhereUniqueWithoutOwnerInput | Prisma.PoolUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: Prisma.PoolUpdateManyWithWhereWithoutOwnerInput | Prisma.PoolUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: Prisma.PoolScalarWhereInput | Prisma.PoolScalarWhereInput[];
};
export type PoolCreateNestedManyWithoutChampionshipInput = {
    create?: Prisma.XOR<Prisma.PoolCreateWithoutChampionshipInput, Prisma.PoolUncheckedCreateWithoutChampionshipInput> | Prisma.PoolCreateWithoutChampionshipInput[] | Prisma.PoolUncheckedCreateWithoutChampionshipInput[];
    connectOrCreate?: Prisma.PoolCreateOrConnectWithoutChampionshipInput | Prisma.PoolCreateOrConnectWithoutChampionshipInput[];
    createMany?: Prisma.PoolCreateManyChampionshipInputEnvelope;
    connect?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
};
export type PoolUncheckedCreateNestedManyWithoutChampionshipInput = {
    create?: Prisma.XOR<Prisma.PoolCreateWithoutChampionshipInput, Prisma.PoolUncheckedCreateWithoutChampionshipInput> | Prisma.PoolCreateWithoutChampionshipInput[] | Prisma.PoolUncheckedCreateWithoutChampionshipInput[];
    connectOrCreate?: Prisma.PoolCreateOrConnectWithoutChampionshipInput | Prisma.PoolCreateOrConnectWithoutChampionshipInput[];
    createMany?: Prisma.PoolCreateManyChampionshipInputEnvelope;
    connect?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
};
export type PoolUpdateManyWithoutChampionshipNestedInput = {
    create?: Prisma.XOR<Prisma.PoolCreateWithoutChampionshipInput, Prisma.PoolUncheckedCreateWithoutChampionshipInput> | Prisma.PoolCreateWithoutChampionshipInput[] | Prisma.PoolUncheckedCreateWithoutChampionshipInput[];
    connectOrCreate?: Prisma.PoolCreateOrConnectWithoutChampionshipInput | Prisma.PoolCreateOrConnectWithoutChampionshipInput[];
    upsert?: Prisma.PoolUpsertWithWhereUniqueWithoutChampionshipInput | Prisma.PoolUpsertWithWhereUniqueWithoutChampionshipInput[];
    createMany?: Prisma.PoolCreateManyChampionshipInputEnvelope;
    set?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
    disconnect?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
    delete?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
    connect?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
    update?: Prisma.PoolUpdateWithWhereUniqueWithoutChampionshipInput | Prisma.PoolUpdateWithWhereUniqueWithoutChampionshipInput[];
    updateMany?: Prisma.PoolUpdateManyWithWhereWithoutChampionshipInput | Prisma.PoolUpdateManyWithWhereWithoutChampionshipInput[];
    deleteMany?: Prisma.PoolScalarWhereInput | Prisma.PoolScalarWhereInput[];
};
export type PoolUncheckedUpdateManyWithoutChampionshipNestedInput = {
    create?: Prisma.XOR<Prisma.PoolCreateWithoutChampionshipInput, Prisma.PoolUncheckedCreateWithoutChampionshipInput> | Prisma.PoolCreateWithoutChampionshipInput[] | Prisma.PoolUncheckedCreateWithoutChampionshipInput[];
    connectOrCreate?: Prisma.PoolCreateOrConnectWithoutChampionshipInput | Prisma.PoolCreateOrConnectWithoutChampionshipInput[];
    upsert?: Prisma.PoolUpsertWithWhereUniqueWithoutChampionshipInput | Prisma.PoolUpsertWithWhereUniqueWithoutChampionshipInput[];
    createMany?: Prisma.PoolCreateManyChampionshipInputEnvelope;
    set?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
    disconnect?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
    delete?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
    connect?: Prisma.PoolWhereUniqueInput | Prisma.PoolWhereUniqueInput[];
    update?: Prisma.PoolUpdateWithWhereUniqueWithoutChampionshipInput | Prisma.PoolUpdateWithWhereUniqueWithoutChampionshipInput[];
    updateMany?: Prisma.PoolUpdateManyWithWhereWithoutChampionshipInput | Prisma.PoolUpdateManyWithWhereWithoutChampionshipInput[];
    deleteMany?: Prisma.PoolScalarWhereInput | Prisma.PoolScalarWhereInput[];
};
export type EnumPoolStatusFieldUpdateOperationsInput = {
    set?: $Enums.PoolStatus;
};
export type PoolCreateNestedOneWithoutPoolUsersInput = {
    create?: Prisma.XOR<Prisma.PoolCreateWithoutPoolUsersInput, Prisma.PoolUncheckedCreateWithoutPoolUsersInput>;
    connectOrCreate?: Prisma.PoolCreateOrConnectWithoutPoolUsersInput;
    connect?: Prisma.PoolWhereUniqueInput;
};
export type PoolUpdateOneRequiredWithoutPoolUsersNestedInput = {
    create?: Prisma.XOR<Prisma.PoolCreateWithoutPoolUsersInput, Prisma.PoolUncheckedCreateWithoutPoolUsersInput>;
    connectOrCreate?: Prisma.PoolCreateOrConnectWithoutPoolUsersInput;
    upsert?: Prisma.PoolUpsertWithoutPoolUsersInput;
    connect?: Prisma.PoolWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PoolUpdateToOneWithWhereWithoutPoolUsersInput, Prisma.PoolUpdateWithoutPoolUsersInput>, Prisma.PoolUncheckedUpdateWithoutPoolUsersInput>;
};
export type PoolCreateNestedOneWithoutInvitationsInput = {
    create?: Prisma.XOR<Prisma.PoolCreateWithoutInvitationsInput, Prisma.PoolUncheckedCreateWithoutInvitationsInput>;
    connectOrCreate?: Prisma.PoolCreateOrConnectWithoutInvitationsInput;
    connect?: Prisma.PoolWhereUniqueInput;
};
export type PoolUpdateOneRequiredWithoutInvitationsNestedInput = {
    create?: Prisma.XOR<Prisma.PoolCreateWithoutInvitationsInput, Prisma.PoolUncheckedCreateWithoutInvitationsInput>;
    connectOrCreate?: Prisma.PoolCreateOrConnectWithoutInvitationsInput;
    upsert?: Prisma.PoolUpsertWithoutInvitationsInput;
    connect?: Prisma.PoolWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PoolUpdateToOneWithWhereWithoutInvitationsInput, Prisma.PoolUpdateWithoutInvitationsInput>, Prisma.PoolUncheckedUpdateWithoutInvitationsInput>;
};
export type PoolCreateNestedOneWithoutPredictionsInput = {
    create?: Prisma.XOR<Prisma.PoolCreateWithoutPredictionsInput, Prisma.PoolUncheckedCreateWithoutPredictionsInput>;
    connectOrCreate?: Prisma.PoolCreateOrConnectWithoutPredictionsInput;
    connect?: Prisma.PoolWhereUniqueInput;
};
export type PoolUpdateOneRequiredWithoutPredictionsNestedInput = {
    create?: Prisma.XOR<Prisma.PoolCreateWithoutPredictionsInput, Prisma.PoolUncheckedCreateWithoutPredictionsInput>;
    connectOrCreate?: Prisma.PoolCreateOrConnectWithoutPredictionsInput;
    upsert?: Prisma.PoolUpsertWithoutPredictionsInput;
    connect?: Prisma.PoolWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PoolUpdateToOneWithWhereWithoutPredictionsInput, Prisma.PoolUpdateWithoutPredictionsInput>, Prisma.PoolUncheckedUpdateWithoutPredictionsInput>;
};
export type PoolCreateNestedOneWithoutPointHistoryInput = {
    create?: Prisma.XOR<Prisma.PoolCreateWithoutPointHistoryInput, Prisma.PoolUncheckedCreateWithoutPointHistoryInput>;
    connectOrCreate?: Prisma.PoolCreateOrConnectWithoutPointHistoryInput;
    connect?: Prisma.PoolWhereUniqueInput;
};
export type PoolUpdateOneRequiredWithoutPointHistoryNestedInput = {
    create?: Prisma.XOR<Prisma.PoolCreateWithoutPointHistoryInput, Prisma.PoolUncheckedCreateWithoutPointHistoryInput>;
    connectOrCreate?: Prisma.PoolCreateOrConnectWithoutPointHistoryInput;
    upsert?: Prisma.PoolUpsertWithoutPointHistoryInput;
    connect?: Prisma.PoolWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PoolUpdateToOneWithWhereWithoutPointHistoryInput, Prisma.PoolUpdateWithoutPointHistoryInput>, Prisma.PoolUncheckedUpdateWithoutPointHistoryInput>;
};
export type PoolCreateWithoutOwnerInput = {
    name: string;
    inviteCode: string;
    status?: $Enums.PoolStatus;
    scoring: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    championship: Prisma.ChampionshipCreateNestedOneWithoutPoolsInput;
    poolUsers?: Prisma.PoolUserCreateNestedManyWithoutPoolInput;
    invitations?: Prisma.InvitationCreateNestedManyWithoutPoolInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutPoolInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutPoolInput;
};
export type PoolUncheckedCreateWithoutOwnerInput = {
    id?: number;
    championshipId: number;
    name: string;
    inviteCode: string;
    status?: $Enums.PoolStatus;
    scoring: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserUncheckedCreateNestedManyWithoutPoolInput;
    invitations?: Prisma.InvitationUncheckedCreateNestedManyWithoutPoolInput;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutPoolInput;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutPoolInput;
};
export type PoolCreateOrConnectWithoutOwnerInput = {
    where: Prisma.PoolWhereUniqueInput;
    create: Prisma.XOR<Prisma.PoolCreateWithoutOwnerInput, Prisma.PoolUncheckedCreateWithoutOwnerInput>;
};
export type PoolCreateManyOwnerInputEnvelope = {
    data: Prisma.PoolCreateManyOwnerInput | Prisma.PoolCreateManyOwnerInput[];
    skipDuplicates?: boolean;
};
export type PoolUpsertWithWhereUniqueWithoutOwnerInput = {
    where: Prisma.PoolWhereUniqueInput;
    update: Prisma.XOR<Prisma.PoolUpdateWithoutOwnerInput, Prisma.PoolUncheckedUpdateWithoutOwnerInput>;
    create: Prisma.XOR<Prisma.PoolCreateWithoutOwnerInput, Prisma.PoolUncheckedCreateWithoutOwnerInput>;
};
export type PoolUpdateWithWhereUniqueWithoutOwnerInput = {
    where: Prisma.PoolWhereUniqueInput;
    data: Prisma.XOR<Prisma.PoolUpdateWithoutOwnerInput, Prisma.PoolUncheckedUpdateWithoutOwnerInput>;
};
export type PoolUpdateManyWithWhereWithoutOwnerInput = {
    where: Prisma.PoolScalarWhereInput;
    data: Prisma.XOR<Prisma.PoolUpdateManyMutationInput, Prisma.PoolUncheckedUpdateManyWithoutOwnerInput>;
};
export type PoolScalarWhereInput = {
    AND?: Prisma.PoolScalarWhereInput | Prisma.PoolScalarWhereInput[];
    OR?: Prisma.PoolScalarWhereInput[];
    NOT?: Prisma.PoolScalarWhereInput | Prisma.PoolScalarWhereInput[];
    id?: Prisma.IntFilter<"Pool"> | number;
    ownerId?: Prisma.IntFilter<"Pool"> | number;
    championshipId?: Prisma.IntFilter<"Pool"> | number;
    name?: Prisma.StringFilter<"Pool"> | string;
    inviteCode?: Prisma.StringFilter<"Pool"> | string;
    status?: Prisma.EnumPoolStatusFilter<"Pool"> | $Enums.PoolStatus;
    scoring?: Prisma.JsonFilter<"Pool">;
    createdAt?: Prisma.DateTimeFilter<"Pool"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Pool"> | Date | string;
};
export type PoolCreateWithoutChampionshipInput = {
    name: string;
    inviteCode: string;
    status?: $Enums.PoolStatus;
    scoring: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner: Prisma.UserCreateNestedOneWithoutOwnedPoolsInput;
    poolUsers?: Prisma.PoolUserCreateNestedManyWithoutPoolInput;
    invitations?: Prisma.InvitationCreateNestedManyWithoutPoolInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutPoolInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutPoolInput;
};
export type PoolUncheckedCreateWithoutChampionshipInput = {
    id?: number;
    ownerId: number;
    name: string;
    inviteCode: string;
    status?: $Enums.PoolStatus;
    scoring: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserUncheckedCreateNestedManyWithoutPoolInput;
    invitations?: Prisma.InvitationUncheckedCreateNestedManyWithoutPoolInput;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutPoolInput;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutPoolInput;
};
export type PoolCreateOrConnectWithoutChampionshipInput = {
    where: Prisma.PoolWhereUniqueInput;
    create: Prisma.XOR<Prisma.PoolCreateWithoutChampionshipInput, Prisma.PoolUncheckedCreateWithoutChampionshipInput>;
};
export type PoolCreateManyChampionshipInputEnvelope = {
    data: Prisma.PoolCreateManyChampionshipInput | Prisma.PoolCreateManyChampionshipInput[];
    skipDuplicates?: boolean;
};
export type PoolUpsertWithWhereUniqueWithoutChampionshipInput = {
    where: Prisma.PoolWhereUniqueInput;
    update: Prisma.XOR<Prisma.PoolUpdateWithoutChampionshipInput, Prisma.PoolUncheckedUpdateWithoutChampionshipInput>;
    create: Prisma.XOR<Prisma.PoolCreateWithoutChampionshipInput, Prisma.PoolUncheckedCreateWithoutChampionshipInput>;
};
export type PoolUpdateWithWhereUniqueWithoutChampionshipInput = {
    where: Prisma.PoolWhereUniqueInput;
    data: Prisma.XOR<Prisma.PoolUpdateWithoutChampionshipInput, Prisma.PoolUncheckedUpdateWithoutChampionshipInput>;
};
export type PoolUpdateManyWithWhereWithoutChampionshipInput = {
    where: Prisma.PoolScalarWhereInput;
    data: Prisma.XOR<Prisma.PoolUpdateManyMutationInput, Prisma.PoolUncheckedUpdateManyWithoutChampionshipInput>;
};
export type PoolCreateWithoutPoolUsersInput = {
    name: string;
    inviteCode: string;
    status?: $Enums.PoolStatus;
    scoring: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner: Prisma.UserCreateNestedOneWithoutOwnedPoolsInput;
    championship: Prisma.ChampionshipCreateNestedOneWithoutPoolsInput;
    invitations?: Prisma.InvitationCreateNestedManyWithoutPoolInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutPoolInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutPoolInput;
};
export type PoolUncheckedCreateWithoutPoolUsersInput = {
    id?: number;
    ownerId: number;
    championshipId: number;
    name: string;
    inviteCode: string;
    status?: $Enums.PoolStatus;
    scoring: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    invitations?: Prisma.InvitationUncheckedCreateNestedManyWithoutPoolInput;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutPoolInput;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutPoolInput;
};
export type PoolCreateOrConnectWithoutPoolUsersInput = {
    where: Prisma.PoolWhereUniqueInput;
    create: Prisma.XOR<Prisma.PoolCreateWithoutPoolUsersInput, Prisma.PoolUncheckedCreateWithoutPoolUsersInput>;
};
export type PoolUpsertWithoutPoolUsersInput = {
    update: Prisma.XOR<Prisma.PoolUpdateWithoutPoolUsersInput, Prisma.PoolUncheckedUpdateWithoutPoolUsersInput>;
    create: Prisma.XOR<Prisma.PoolCreateWithoutPoolUsersInput, Prisma.PoolUncheckedCreateWithoutPoolUsersInput>;
    where?: Prisma.PoolWhereInput;
};
export type PoolUpdateToOneWithWhereWithoutPoolUsersInput = {
    where?: Prisma.PoolWhereInput;
    data: Prisma.XOR<Prisma.PoolUpdateWithoutPoolUsersInput, Prisma.PoolUncheckedUpdateWithoutPoolUsersInput>;
};
export type PoolUpdateWithoutPoolUsersInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneRequiredWithoutOwnedPoolsNestedInput;
    championship?: Prisma.ChampionshipUpdateOneRequiredWithoutPoolsNestedInput;
    invitations?: Prisma.InvitationUpdateManyWithoutPoolNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutPoolNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutPoolNestedInput;
};
export type PoolUncheckedUpdateWithoutPoolUsersInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ownerId?: Prisma.IntFieldUpdateOperationsInput | number;
    championshipId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invitations?: Prisma.InvitationUncheckedUpdateManyWithoutPoolNestedInput;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutPoolNestedInput;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutPoolNestedInput;
};
export type PoolCreateWithoutInvitationsInput = {
    name: string;
    inviteCode: string;
    status?: $Enums.PoolStatus;
    scoring: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner: Prisma.UserCreateNestedOneWithoutOwnedPoolsInput;
    championship: Prisma.ChampionshipCreateNestedOneWithoutPoolsInput;
    poolUsers?: Prisma.PoolUserCreateNestedManyWithoutPoolInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutPoolInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutPoolInput;
};
export type PoolUncheckedCreateWithoutInvitationsInput = {
    id?: number;
    ownerId: number;
    championshipId: number;
    name: string;
    inviteCode: string;
    status?: $Enums.PoolStatus;
    scoring: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserUncheckedCreateNestedManyWithoutPoolInput;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutPoolInput;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutPoolInput;
};
export type PoolCreateOrConnectWithoutInvitationsInput = {
    where: Prisma.PoolWhereUniqueInput;
    create: Prisma.XOR<Prisma.PoolCreateWithoutInvitationsInput, Prisma.PoolUncheckedCreateWithoutInvitationsInput>;
};
export type PoolUpsertWithoutInvitationsInput = {
    update: Prisma.XOR<Prisma.PoolUpdateWithoutInvitationsInput, Prisma.PoolUncheckedUpdateWithoutInvitationsInput>;
    create: Prisma.XOR<Prisma.PoolCreateWithoutInvitationsInput, Prisma.PoolUncheckedCreateWithoutInvitationsInput>;
    where?: Prisma.PoolWhereInput;
};
export type PoolUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: Prisma.PoolWhereInput;
    data: Prisma.XOR<Prisma.PoolUpdateWithoutInvitationsInput, Prisma.PoolUncheckedUpdateWithoutInvitationsInput>;
};
export type PoolUpdateWithoutInvitationsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneRequiredWithoutOwnedPoolsNestedInput;
    championship?: Prisma.ChampionshipUpdateOneRequiredWithoutPoolsNestedInput;
    poolUsers?: Prisma.PoolUserUpdateManyWithoutPoolNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutPoolNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutPoolNestedInput;
};
export type PoolUncheckedUpdateWithoutInvitationsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ownerId?: Prisma.IntFieldUpdateOperationsInput | number;
    championshipId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUncheckedUpdateManyWithoutPoolNestedInput;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutPoolNestedInput;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutPoolNestedInput;
};
export type PoolCreateWithoutPredictionsInput = {
    name: string;
    inviteCode: string;
    status?: $Enums.PoolStatus;
    scoring: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner: Prisma.UserCreateNestedOneWithoutOwnedPoolsInput;
    championship: Prisma.ChampionshipCreateNestedOneWithoutPoolsInput;
    poolUsers?: Prisma.PoolUserCreateNestedManyWithoutPoolInput;
    invitations?: Prisma.InvitationCreateNestedManyWithoutPoolInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutPoolInput;
};
export type PoolUncheckedCreateWithoutPredictionsInput = {
    id?: number;
    ownerId: number;
    championshipId: number;
    name: string;
    inviteCode: string;
    status?: $Enums.PoolStatus;
    scoring: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserUncheckedCreateNestedManyWithoutPoolInput;
    invitations?: Prisma.InvitationUncheckedCreateNestedManyWithoutPoolInput;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutPoolInput;
};
export type PoolCreateOrConnectWithoutPredictionsInput = {
    where: Prisma.PoolWhereUniqueInput;
    create: Prisma.XOR<Prisma.PoolCreateWithoutPredictionsInput, Prisma.PoolUncheckedCreateWithoutPredictionsInput>;
};
export type PoolUpsertWithoutPredictionsInput = {
    update: Prisma.XOR<Prisma.PoolUpdateWithoutPredictionsInput, Prisma.PoolUncheckedUpdateWithoutPredictionsInput>;
    create: Prisma.XOR<Prisma.PoolCreateWithoutPredictionsInput, Prisma.PoolUncheckedCreateWithoutPredictionsInput>;
    where?: Prisma.PoolWhereInput;
};
export type PoolUpdateToOneWithWhereWithoutPredictionsInput = {
    where?: Prisma.PoolWhereInput;
    data: Prisma.XOR<Prisma.PoolUpdateWithoutPredictionsInput, Prisma.PoolUncheckedUpdateWithoutPredictionsInput>;
};
export type PoolUpdateWithoutPredictionsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneRequiredWithoutOwnedPoolsNestedInput;
    championship?: Prisma.ChampionshipUpdateOneRequiredWithoutPoolsNestedInput;
    poolUsers?: Prisma.PoolUserUpdateManyWithoutPoolNestedInput;
    invitations?: Prisma.InvitationUpdateManyWithoutPoolNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutPoolNestedInput;
};
export type PoolUncheckedUpdateWithoutPredictionsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ownerId?: Prisma.IntFieldUpdateOperationsInput | number;
    championshipId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUncheckedUpdateManyWithoutPoolNestedInput;
    invitations?: Prisma.InvitationUncheckedUpdateManyWithoutPoolNestedInput;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutPoolNestedInput;
};
export type PoolCreateWithoutPointHistoryInput = {
    name: string;
    inviteCode: string;
    status?: $Enums.PoolStatus;
    scoring: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner: Prisma.UserCreateNestedOneWithoutOwnedPoolsInput;
    championship: Prisma.ChampionshipCreateNestedOneWithoutPoolsInput;
    poolUsers?: Prisma.PoolUserCreateNestedManyWithoutPoolInput;
    invitations?: Prisma.InvitationCreateNestedManyWithoutPoolInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutPoolInput;
};
export type PoolUncheckedCreateWithoutPointHistoryInput = {
    id?: number;
    ownerId: number;
    championshipId: number;
    name: string;
    inviteCode: string;
    status?: $Enums.PoolStatus;
    scoring: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserUncheckedCreateNestedManyWithoutPoolInput;
    invitations?: Prisma.InvitationUncheckedCreateNestedManyWithoutPoolInput;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutPoolInput;
};
export type PoolCreateOrConnectWithoutPointHistoryInput = {
    where: Prisma.PoolWhereUniqueInput;
    create: Prisma.XOR<Prisma.PoolCreateWithoutPointHistoryInput, Prisma.PoolUncheckedCreateWithoutPointHistoryInput>;
};
export type PoolUpsertWithoutPointHistoryInput = {
    update: Prisma.XOR<Prisma.PoolUpdateWithoutPointHistoryInput, Prisma.PoolUncheckedUpdateWithoutPointHistoryInput>;
    create: Prisma.XOR<Prisma.PoolCreateWithoutPointHistoryInput, Prisma.PoolUncheckedCreateWithoutPointHistoryInput>;
    where?: Prisma.PoolWhereInput;
};
export type PoolUpdateToOneWithWhereWithoutPointHistoryInput = {
    where?: Prisma.PoolWhereInput;
    data: Prisma.XOR<Prisma.PoolUpdateWithoutPointHistoryInput, Prisma.PoolUncheckedUpdateWithoutPointHistoryInput>;
};
export type PoolUpdateWithoutPointHistoryInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneRequiredWithoutOwnedPoolsNestedInput;
    championship?: Prisma.ChampionshipUpdateOneRequiredWithoutPoolsNestedInput;
    poolUsers?: Prisma.PoolUserUpdateManyWithoutPoolNestedInput;
    invitations?: Prisma.InvitationUpdateManyWithoutPoolNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutPoolNestedInput;
};
export type PoolUncheckedUpdateWithoutPointHistoryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ownerId?: Prisma.IntFieldUpdateOperationsInput | number;
    championshipId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUncheckedUpdateManyWithoutPoolNestedInput;
    invitations?: Prisma.InvitationUncheckedUpdateManyWithoutPoolNestedInput;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutPoolNestedInput;
};
export type PoolCreateManyOwnerInput = {
    id?: number;
    championshipId: number;
    name: string;
    inviteCode: string;
    status?: $Enums.PoolStatus;
    scoring: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PoolUpdateWithoutOwnerInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    championship?: Prisma.ChampionshipUpdateOneRequiredWithoutPoolsNestedInput;
    poolUsers?: Prisma.PoolUserUpdateManyWithoutPoolNestedInput;
    invitations?: Prisma.InvitationUpdateManyWithoutPoolNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutPoolNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutPoolNestedInput;
};
export type PoolUncheckedUpdateWithoutOwnerInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    championshipId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUncheckedUpdateManyWithoutPoolNestedInput;
    invitations?: Prisma.InvitationUncheckedUpdateManyWithoutPoolNestedInput;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutPoolNestedInput;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutPoolNestedInput;
};
export type PoolUncheckedUpdateManyWithoutOwnerInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    championshipId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PoolCreateManyChampionshipInput = {
    id?: number;
    ownerId: number;
    name: string;
    inviteCode: string;
    status?: $Enums.PoolStatus;
    scoring: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PoolUpdateWithoutChampionshipInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneRequiredWithoutOwnedPoolsNestedInput;
    poolUsers?: Prisma.PoolUserUpdateManyWithoutPoolNestedInput;
    invitations?: Prisma.InvitationUpdateManyWithoutPoolNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutPoolNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutPoolNestedInput;
};
export type PoolUncheckedUpdateWithoutChampionshipInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ownerId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUncheckedUpdateManyWithoutPoolNestedInput;
    invitations?: Prisma.InvitationUncheckedUpdateManyWithoutPoolNestedInput;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutPoolNestedInput;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutPoolNestedInput;
};
export type PoolUncheckedUpdateManyWithoutChampionshipInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ownerId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteCode?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumPoolStatusFieldUpdateOperationsInput | $Enums.PoolStatus;
    scoring?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PoolCountOutputType = {
    poolUsers: number;
    invitations: number;
    predictions: number;
    pointHistory: number;
};
export type PoolCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    poolUsers?: boolean | PoolCountOutputTypeCountPoolUsersArgs;
    invitations?: boolean | PoolCountOutputTypeCountInvitationsArgs;
    predictions?: boolean | PoolCountOutputTypeCountPredictionsArgs;
    pointHistory?: boolean | PoolCountOutputTypeCountPointHistoryArgs;
};
export type PoolCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolCountOutputTypeSelect<ExtArgs> | null;
};
export type PoolCountOutputTypeCountPoolUsersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PoolUserWhereInput;
};
export type PoolCountOutputTypeCountInvitationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvitationWhereInput;
};
export type PoolCountOutputTypeCountPredictionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PredictionWhereInput;
};
export type PoolCountOutputTypeCountPointHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PointHistoryWhereInput;
};
export type PoolSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ownerId?: boolean;
    championshipId?: boolean;
    name?: boolean;
    inviteCode?: boolean;
    status?: boolean;
    scoring?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    championship?: boolean | Prisma.ChampionshipDefaultArgs<ExtArgs>;
    poolUsers?: boolean | Prisma.Pool$poolUsersArgs<ExtArgs>;
    invitations?: boolean | Prisma.Pool$invitationsArgs<ExtArgs>;
    predictions?: boolean | Prisma.Pool$predictionsArgs<ExtArgs>;
    pointHistory?: boolean | Prisma.Pool$pointHistoryArgs<ExtArgs>;
    _count?: boolean | Prisma.PoolCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pool"]>;
export type PoolSelectScalar = {
    id?: boolean;
    ownerId?: boolean;
    championshipId?: boolean;
    name?: boolean;
    inviteCode?: boolean;
    status?: boolean;
    scoring?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PoolOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "ownerId" | "championshipId" | "name" | "inviteCode" | "status" | "scoring" | "createdAt" | "updatedAt", ExtArgs["result"]["pool"]>;
export type PoolInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    championship?: boolean | Prisma.ChampionshipDefaultArgs<ExtArgs>;
    poolUsers?: boolean | Prisma.Pool$poolUsersArgs<ExtArgs>;
    invitations?: boolean | Prisma.Pool$invitationsArgs<ExtArgs>;
    predictions?: boolean | Prisma.Pool$predictionsArgs<ExtArgs>;
    pointHistory?: boolean | Prisma.Pool$pointHistoryArgs<ExtArgs>;
    _count?: boolean | Prisma.PoolCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $PoolPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Pool";
    objects: {
        owner: Prisma.$UserPayload<ExtArgs>;
        championship: Prisma.$ChampionshipPayload<ExtArgs>;
        poolUsers: Prisma.$PoolUserPayload<ExtArgs>[];
        invitations: Prisma.$InvitationPayload<ExtArgs>[];
        predictions: Prisma.$PredictionPayload<ExtArgs>[];
        pointHistory: Prisma.$PointHistoryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        ownerId: number;
        championshipId: number;
        name: string;
        inviteCode: string;
        status: $Enums.PoolStatus;
        scoring: runtime.JsonValue;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["pool"]>;
    composites: {};
};
export type PoolGetPayload<S extends boolean | null | undefined | PoolDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PoolPayload, S>;
export type PoolCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PoolFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PoolCountAggregateInputType | true;
};
export interface PoolDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Pool'];
        meta: {
            name: 'Pool';
        };
    };
    findUnique<T extends PoolFindUniqueArgs>(args: Prisma.SelectSubset<T, PoolFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PoolClient<runtime.Types.Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PoolFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PoolFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PoolClient<runtime.Types.Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PoolFindFirstArgs>(args?: Prisma.SelectSubset<T, PoolFindFirstArgs<ExtArgs>>): Prisma.Prisma__PoolClient<runtime.Types.Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PoolFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PoolFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PoolClient<runtime.Types.Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PoolFindManyArgs>(args?: Prisma.SelectSubset<T, PoolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PoolCreateArgs>(args: Prisma.SelectSubset<T, PoolCreateArgs<ExtArgs>>): Prisma.Prisma__PoolClient<runtime.Types.Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PoolCreateManyArgs>(args?: Prisma.SelectSubset<T, PoolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends PoolDeleteArgs>(args: Prisma.SelectSubset<T, PoolDeleteArgs<ExtArgs>>): Prisma.Prisma__PoolClient<runtime.Types.Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PoolUpdateArgs>(args: Prisma.SelectSubset<T, PoolUpdateArgs<ExtArgs>>): Prisma.Prisma__PoolClient<runtime.Types.Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PoolDeleteManyArgs>(args?: Prisma.SelectSubset<T, PoolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PoolUpdateManyArgs>(args: Prisma.SelectSubset<T, PoolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends PoolUpsertArgs>(args: Prisma.SelectSubset<T, PoolUpsertArgs<ExtArgs>>): Prisma.Prisma__PoolClient<runtime.Types.Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PoolCountArgs>(args?: Prisma.Subset<T, PoolCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PoolCountAggregateOutputType> : number>;
    aggregate<T extends PoolAggregateArgs>(args: Prisma.Subset<T, PoolAggregateArgs>): Prisma.PrismaPromise<GetPoolAggregateType<T>>;
    groupBy<T extends PoolGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PoolGroupByArgs['orderBy'];
    } : {
        orderBy?: PoolGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PoolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPoolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PoolFieldRefs;
}
export interface Prisma__PoolClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    owner<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    championship<T extends Prisma.ChampionshipDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ChampionshipDefaultArgs<ExtArgs>>): Prisma.Prisma__ChampionshipClient<runtime.Types.Result.GetResult<Prisma.$ChampionshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    poolUsers<T extends Prisma.Pool$poolUsersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Pool$poolUsersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PoolUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    invitations<T extends Prisma.Pool$invitationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Pool$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    predictions<T extends Prisma.Pool$predictionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Pool$predictionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    pointHistory<T extends Prisma.Pool$pointHistoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Pool$pointHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PointHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PoolFieldRefs {
    readonly id: Prisma.FieldRef<"Pool", 'Int'>;
    readonly ownerId: Prisma.FieldRef<"Pool", 'Int'>;
    readonly championshipId: Prisma.FieldRef<"Pool", 'Int'>;
    readonly name: Prisma.FieldRef<"Pool", 'String'>;
    readonly inviteCode: Prisma.FieldRef<"Pool", 'String'>;
    readonly status: Prisma.FieldRef<"Pool", 'PoolStatus'>;
    readonly scoring: Prisma.FieldRef<"Pool", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"Pool", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Pool", 'DateTime'>;
}
export type PoolFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolSelect<ExtArgs> | null;
    omit?: Prisma.PoolOmit<ExtArgs> | null;
    include?: Prisma.PoolInclude<ExtArgs> | null;
    where: Prisma.PoolWhereUniqueInput;
};
export type PoolFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolSelect<ExtArgs> | null;
    omit?: Prisma.PoolOmit<ExtArgs> | null;
    include?: Prisma.PoolInclude<ExtArgs> | null;
    where: Prisma.PoolWhereUniqueInput;
};
export type PoolFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolSelect<ExtArgs> | null;
    omit?: Prisma.PoolOmit<ExtArgs> | null;
    include?: Prisma.PoolInclude<ExtArgs> | null;
    where?: Prisma.PoolWhereInput;
    orderBy?: Prisma.PoolOrderByWithRelationInput | Prisma.PoolOrderByWithRelationInput[];
    cursor?: Prisma.PoolWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PoolScalarFieldEnum | Prisma.PoolScalarFieldEnum[];
};
export type PoolFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolSelect<ExtArgs> | null;
    omit?: Prisma.PoolOmit<ExtArgs> | null;
    include?: Prisma.PoolInclude<ExtArgs> | null;
    where?: Prisma.PoolWhereInput;
    orderBy?: Prisma.PoolOrderByWithRelationInput | Prisma.PoolOrderByWithRelationInput[];
    cursor?: Prisma.PoolWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PoolScalarFieldEnum | Prisma.PoolScalarFieldEnum[];
};
export type PoolFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolSelect<ExtArgs> | null;
    omit?: Prisma.PoolOmit<ExtArgs> | null;
    include?: Prisma.PoolInclude<ExtArgs> | null;
    where?: Prisma.PoolWhereInput;
    orderBy?: Prisma.PoolOrderByWithRelationInput | Prisma.PoolOrderByWithRelationInput[];
    cursor?: Prisma.PoolWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PoolScalarFieldEnum | Prisma.PoolScalarFieldEnum[];
};
export type PoolCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolSelect<ExtArgs> | null;
    omit?: Prisma.PoolOmit<ExtArgs> | null;
    include?: Prisma.PoolInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PoolCreateInput, Prisma.PoolUncheckedCreateInput>;
};
export type PoolCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PoolCreateManyInput | Prisma.PoolCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PoolUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolSelect<ExtArgs> | null;
    omit?: Prisma.PoolOmit<ExtArgs> | null;
    include?: Prisma.PoolInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PoolUpdateInput, Prisma.PoolUncheckedUpdateInput>;
    where: Prisma.PoolWhereUniqueInput;
};
export type PoolUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PoolUpdateManyMutationInput, Prisma.PoolUncheckedUpdateManyInput>;
    where?: Prisma.PoolWhereInput;
    limit?: number;
};
export type PoolUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolSelect<ExtArgs> | null;
    omit?: Prisma.PoolOmit<ExtArgs> | null;
    include?: Prisma.PoolInclude<ExtArgs> | null;
    where: Prisma.PoolWhereUniqueInput;
    create: Prisma.XOR<Prisma.PoolCreateInput, Prisma.PoolUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PoolUpdateInput, Prisma.PoolUncheckedUpdateInput>;
};
export type PoolDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolSelect<ExtArgs> | null;
    omit?: Prisma.PoolOmit<ExtArgs> | null;
    include?: Prisma.PoolInclude<ExtArgs> | null;
    where: Prisma.PoolWhereUniqueInput;
};
export type PoolDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PoolWhereInput;
    limit?: number;
};
export type Pool$poolUsersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolUserSelect<ExtArgs> | null;
    omit?: Prisma.PoolUserOmit<ExtArgs> | null;
    include?: Prisma.PoolUserInclude<ExtArgs> | null;
    where?: Prisma.PoolUserWhereInput;
    orderBy?: Prisma.PoolUserOrderByWithRelationInput | Prisma.PoolUserOrderByWithRelationInput[];
    cursor?: Prisma.PoolUserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PoolUserScalarFieldEnum | Prisma.PoolUserScalarFieldEnum[];
};
export type Pool$invitationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvitationSelect<ExtArgs> | null;
    omit?: Prisma.InvitationOmit<ExtArgs> | null;
    include?: Prisma.InvitationInclude<ExtArgs> | null;
    where?: Prisma.InvitationWhereInput;
    orderBy?: Prisma.InvitationOrderByWithRelationInput | Prisma.InvitationOrderByWithRelationInput[];
    cursor?: Prisma.InvitationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvitationScalarFieldEnum | Prisma.InvitationScalarFieldEnum[];
};
export type Pool$predictionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Pool$pointHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PoolDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolSelect<ExtArgs> | null;
    omit?: Prisma.PoolOmit<ExtArgs> | null;
    include?: Prisma.PoolInclude<ExtArgs> | null;
};
