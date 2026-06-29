import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PoolUserModel = runtime.Types.Result.DefaultSelection<Prisma.$PoolUserPayload>;
export type AggregatePoolUser = {
    _count: PoolUserCountAggregateOutputType | null;
    _avg: PoolUserAvgAggregateOutputType | null;
    _sum: PoolUserSumAggregateOutputType | null;
    _min: PoolUserMinAggregateOutputType | null;
    _max: PoolUserMaxAggregateOutputType | null;
};
export type PoolUserAvgAggregateOutputType = {
    id: number | null;
    poolId: number | null;
    userId: number | null;
};
export type PoolUserSumAggregateOutputType = {
    id: number | null;
    poolId: number | null;
    userId: number | null;
};
export type PoolUserMinAggregateOutputType = {
    id: number | null;
    poolId: number | null;
    userId: number | null;
    status: $Enums.PoolUserStatus | null;
    joinedAt: Date | null;
};
export type PoolUserMaxAggregateOutputType = {
    id: number | null;
    poolId: number | null;
    userId: number | null;
    status: $Enums.PoolUserStatus | null;
    joinedAt: Date | null;
};
export type PoolUserCountAggregateOutputType = {
    id: number;
    poolId: number;
    userId: number;
    status: number;
    joinedAt: number;
    _all: number;
};
export type PoolUserAvgAggregateInputType = {
    id?: true;
    poolId?: true;
    userId?: true;
};
export type PoolUserSumAggregateInputType = {
    id?: true;
    poolId?: true;
    userId?: true;
};
export type PoolUserMinAggregateInputType = {
    id?: true;
    poolId?: true;
    userId?: true;
    status?: true;
    joinedAt?: true;
};
export type PoolUserMaxAggregateInputType = {
    id?: true;
    poolId?: true;
    userId?: true;
    status?: true;
    joinedAt?: true;
};
export type PoolUserCountAggregateInputType = {
    id?: true;
    poolId?: true;
    userId?: true;
    status?: true;
    joinedAt?: true;
    _all?: true;
};
export type PoolUserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PoolUserWhereInput;
    orderBy?: Prisma.PoolUserOrderByWithRelationInput | Prisma.PoolUserOrderByWithRelationInput[];
    cursor?: Prisma.PoolUserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PoolUserCountAggregateInputType;
    _avg?: PoolUserAvgAggregateInputType;
    _sum?: PoolUserSumAggregateInputType;
    _min?: PoolUserMinAggregateInputType;
    _max?: PoolUserMaxAggregateInputType;
};
export type GetPoolUserAggregateType<T extends PoolUserAggregateArgs> = {
    [P in keyof T & keyof AggregatePoolUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePoolUser[P]> : Prisma.GetScalarType<T[P], AggregatePoolUser[P]>;
};
export type PoolUserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PoolUserWhereInput;
    orderBy?: Prisma.PoolUserOrderByWithAggregationInput | Prisma.PoolUserOrderByWithAggregationInput[];
    by: Prisma.PoolUserScalarFieldEnum[] | Prisma.PoolUserScalarFieldEnum;
    having?: Prisma.PoolUserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PoolUserCountAggregateInputType | true;
    _avg?: PoolUserAvgAggregateInputType;
    _sum?: PoolUserSumAggregateInputType;
    _min?: PoolUserMinAggregateInputType;
    _max?: PoolUserMaxAggregateInputType;
};
export type PoolUserGroupByOutputType = {
    id: number;
    poolId: number;
    userId: number;
    status: $Enums.PoolUserStatus;
    joinedAt: Date;
    _count: PoolUserCountAggregateOutputType | null;
    _avg: PoolUserAvgAggregateOutputType | null;
    _sum: PoolUserSumAggregateOutputType | null;
    _min: PoolUserMinAggregateOutputType | null;
    _max: PoolUserMaxAggregateOutputType | null;
};
export type GetPoolUserGroupByPayload<T extends PoolUserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PoolUserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PoolUserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PoolUserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PoolUserGroupByOutputType[P]>;
}>>;
export type PoolUserWhereInput = {
    AND?: Prisma.PoolUserWhereInput | Prisma.PoolUserWhereInput[];
    OR?: Prisma.PoolUserWhereInput[];
    NOT?: Prisma.PoolUserWhereInput | Prisma.PoolUserWhereInput[];
    id?: Prisma.IntFilter<"PoolUser"> | number;
    poolId?: Prisma.IntFilter<"PoolUser"> | number;
    userId?: Prisma.IntFilter<"PoolUser"> | number;
    status?: Prisma.EnumPoolUserStatusFilter<"PoolUser"> | $Enums.PoolUserStatus;
    joinedAt?: Prisma.DateTimeFilter<"PoolUser"> | Date | string;
    pool?: Prisma.XOR<Prisma.PoolScalarRelationFilter, Prisma.PoolWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type PoolUserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    pool?: Prisma.PoolOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type PoolUserWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    poolId_userId?: Prisma.PoolUserPoolIdUserIdCompoundUniqueInput;
    AND?: Prisma.PoolUserWhereInput | Prisma.PoolUserWhereInput[];
    OR?: Prisma.PoolUserWhereInput[];
    NOT?: Prisma.PoolUserWhereInput | Prisma.PoolUserWhereInput[];
    poolId?: Prisma.IntFilter<"PoolUser"> | number;
    userId?: Prisma.IntFilter<"PoolUser"> | number;
    status?: Prisma.EnumPoolUserStatusFilter<"PoolUser"> | $Enums.PoolUserStatus;
    joinedAt?: Prisma.DateTimeFilter<"PoolUser"> | Date | string;
    pool?: Prisma.XOR<Prisma.PoolScalarRelationFilter, Prisma.PoolWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "poolId_userId">;
export type PoolUserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    _count?: Prisma.PoolUserCountOrderByAggregateInput;
    _avg?: Prisma.PoolUserAvgOrderByAggregateInput;
    _max?: Prisma.PoolUserMaxOrderByAggregateInput;
    _min?: Prisma.PoolUserMinOrderByAggregateInput;
    _sum?: Prisma.PoolUserSumOrderByAggregateInput;
};
export type PoolUserScalarWhereWithAggregatesInput = {
    AND?: Prisma.PoolUserScalarWhereWithAggregatesInput | Prisma.PoolUserScalarWhereWithAggregatesInput[];
    OR?: Prisma.PoolUserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PoolUserScalarWhereWithAggregatesInput | Prisma.PoolUserScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"PoolUser"> | number;
    poolId?: Prisma.IntWithAggregatesFilter<"PoolUser"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"PoolUser"> | number;
    status?: Prisma.EnumPoolUserStatusWithAggregatesFilter<"PoolUser"> | $Enums.PoolUserStatus;
    joinedAt?: Prisma.DateTimeWithAggregatesFilter<"PoolUser"> | Date | string;
};
export type PoolUserCreateInput = {
    status?: $Enums.PoolUserStatus;
    joinedAt?: Date | string;
    pool: Prisma.PoolCreateNestedOneWithoutPoolUsersInput;
    user: Prisma.UserCreateNestedOneWithoutPoolUsersInput;
};
export type PoolUserUncheckedCreateInput = {
    id?: number;
    poolId: number;
    userId: number;
    status?: $Enums.PoolUserStatus;
    joinedAt?: Date | string;
};
export type PoolUserUpdateInput = {
    status?: Prisma.EnumPoolUserStatusFieldUpdateOperationsInput | $Enums.PoolUserStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pool?: Prisma.PoolUpdateOneRequiredWithoutPoolUsersNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutPoolUsersNestedInput;
};
export type PoolUserUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumPoolUserStatusFieldUpdateOperationsInput | $Enums.PoolUserStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PoolUserCreateManyInput = {
    id?: number;
    poolId: number;
    userId: number;
    status?: $Enums.PoolUserStatus;
    joinedAt?: Date | string;
};
export type PoolUserUpdateManyMutationInput = {
    status?: Prisma.EnumPoolUserStatusFieldUpdateOperationsInput | $Enums.PoolUserStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PoolUserUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumPoolUserStatusFieldUpdateOperationsInput | $Enums.PoolUserStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PoolUserListRelationFilter = {
    every?: Prisma.PoolUserWhereInput;
    some?: Prisma.PoolUserWhereInput;
    none?: Prisma.PoolUserWhereInput;
};
export type PoolUserOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PoolUserPoolIdUserIdCompoundUniqueInput = {
    poolId: number;
    userId: number;
};
export type PoolUserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
};
export type PoolUserAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type PoolUserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
};
export type PoolUserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
};
export type PoolUserSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type PoolUserCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PoolUserCreateWithoutUserInput, Prisma.PoolUserUncheckedCreateWithoutUserInput> | Prisma.PoolUserCreateWithoutUserInput[] | Prisma.PoolUserUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PoolUserCreateOrConnectWithoutUserInput | Prisma.PoolUserCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PoolUserCreateManyUserInputEnvelope;
    connect?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
};
export type PoolUserUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PoolUserCreateWithoutUserInput, Prisma.PoolUserUncheckedCreateWithoutUserInput> | Prisma.PoolUserCreateWithoutUserInput[] | Prisma.PoolUserUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PoolUserCreateOrConnectWithoutUserInput | Prisma.PoolUserCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PoolUserCreateManyUserInputEnvelope;
    connect?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
};
export type PoolUserUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PoolUserCreateWithoutUserInput, Prisma.PoolUserUncheckedCreateWithoutUserInput> | Prisma.PoolUserCreateWithoutUserInput[] | Prisma.PoolUserUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PoolUserCreateOrConnectWithoutUserInput | Prisma.PoolUserCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PoolUserUpsertWithWhereUniqueWithoutUserInput | Prisma.PoolUserUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PoolUserCreateManyUserInputEnvelope;
    set?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
    disconnect?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
    delete?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
    connect?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
    update?: Prisma.PoolUserUpdateWithWhereUniqueWithoutUserInput | Prisma.PoolUserUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PoolUserUpdateManyWithWhereWithoutUserInput | Prisma.PoolUserUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PoolUserScalarWhereInput | Prisma.PoolUserScalarWhereInput[];
};
export type PoolUserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PoolUserCreateWithoutUserInput, Prisma.PoolUserUncheckedCreateWithoutUserInput> | Prisma.PoolUserCreateWithoutUserInput[] | Prisma.PoolUserUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PoolUserCreateOrConnectWithoutUserInput | Prisma.PoolUserCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PoolUserUpsertWithWhereUniqueWithoutUserInput | Prisma.PoolUserUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PoolUserCreateManyUserInputEnvelope;
    set?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
    disconnect?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
    delete?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
    connect?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
    update?: Prisma.PoolUserUpdateWithWhereUniqueWithoutUserInput | Prisma.PoolUserUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PoolUserUpdateManyWithWhereWithoutUserInput | Prisma.PoolUserUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PoolUserScalarWhereInput | Prisma.PoolUserScalarWhereInput[];
};
export type PoolUserCreateNestedManyWithoutPoolInput = {
    create?: Prisma.XOR<Prisma.PoolUserCreateWithoutPoolInput, Prisma.PoolUserUncheckedCreateWithoutPoolInput> | Prisma.PoolUserCreateWithoutPoolInput[] | Prisma.PoolUserUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.PoolUserCreateOrConnectWithoutPoolInput | Prisma.PoolUserCreateOrConnectWithoutPoolInput[];
    createMany?: Prisma.PoolUserCreateManyPoolInputEnvelope;
    connect?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
};
export type PoolUserUncheckedCreateNestedManyWithoutPoolInput = {
    create?: Prisma.XOR<Prisma.PoolUserCreateWithoutPoolInput, Prisma.PoolUserUncheckedCreateWithoutPoolInput> | Prisma.PoolUserCreateWithoutPoolInput[] | Prisma.PoolUserUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.PoolUserCreateOrConnectWithoutPoolInput | Prisma.PoolUserCreateOrConnectWithoutPoolInput[];
    createMany?: Prisma.PoolUserCreateManyPoolInputEnvelope;
    connect?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
};
export type PoolUserUpdateManyWithoutPoolNestedInput = {
    create?: Prisma.XOR<Prisma.PoolUserCreateWithoutPoolInput, Prisma.PoolUserUncheckedCreateWithoutPoolInput> | Prisma.PoolUserCreateWithoutPoolInput[] | Prisma.PoolUserUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.PoolUserCreateOrConnectWithoutPoolInput | Prisma.PoolUserCreateOrConnectWithoutPoolInput[];
    upsert?: Prisma.PoolUserUpsertWithWhereUniqueWithoutPoolInput | Prisma.PoolUserUpsertWithWhereUniqueWithoutPoolInput[];
    createMany?: Prisma.PoolUserCreateManyPoolInputEnvelope;
    set?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
    disconnect?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
    delete?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
    connect?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
    update?: Prisma.PoolUserUpdateWithWhereUniqueWithoutPoolInput | Prisma.PoolUserUpdateWithWhereUniqueWithoutPoolInput[];
    updateMany?: Prisma.PoolUserUpdateManyWithWhereWithoutPoolInput | Prisma.PoolUserUpdateManyWithWhereWithoutPoolInput[];
    deleteMany?: Prisma.PoolUserScalarWhereInput | Prisma.PoolUserScalarWhereInput[];
};
export type PoolUserUncheckedUpdateManyWithoutPoolNestedInput = {
    create?: Prisma.XOR<Prisma.PoolUserCreateWithoutPoolInput, Prisma.PoolUserUncheckedCreateWithoutPoolInput> | Prisma.PoolUserCreateWithoutPoolInput[] | Prisma.PoolUserUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.PoolUserCreateOrConnectWithoutPoolInput | Prisma.PoolUserCreateOrConnectWithoutPoolInput[];
    upsert?: Prisma.PoolUserUpsertWithWhereUniqueWithoutPoolInput | Prisma.PoolUserUpsertWithWhereUniqueWithoutPoolInput[];
    createMany?: Prisma.PoolUserCreateManyPoolInputEnvelope;
    set?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
    disconnect?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
    delete?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
    connect?: Prisma.PoolUserWhereUniqueInput | Prisma.PoolUserWhereUniqueInput[];
    update?: Prisma.PoolUserUpdateWithWhereUniqueWithoutPoolInput | Prisma.PoolUserUpdateWithWhereUniqueWithoutPoolInput[];
    updateMany?: Prisma.PoolUserUpdateManyWithWhereWithoutPoolInput | Prisma.PoolUserUpdateManyWithWhereWithoutPoolInput[];
    deleteMany?: Prisma.PoolUserScalarWhereInput | Prisma.PoolUserScalarWhereInput[];
};
export type EnumPoolUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.PoolUserStatus;
};
export type PoolUserCreateWithoutUserInput = {
    status?: $Enums.PoolUserStatus;
    joinedAt?: Date | string;
    pool: Prisma.PoolCreateNestedOneWithoutPoolUsersInput;
};
export type PoolUserUncheckedCreateWithoutUserInput = {
    id?: number;
    poolId: number;
    status?: $Enums.PoolUserStatus;
    joinedAt?: Date | string;
};
export type PoolUserCreateOrConnectWithoutUserInput = {
    where: Prisma.PoolUserWhereUniqueInput;
    create: Prisma.XOR<Prisma.PoolUserCreateWithoutUserInput, Prisma.PoolUserUncheckedCreateWithoutUserInput>;
};
export type PoolUserCreateManyUserInputEnvelope = {
    data: Prisma.PoolUserCreateManyUserInput | Prisma.PoolUserCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PoolUserUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PoolUserWhereUniqueInput;
    update: Prisma.XOR<Prisma.PoolUserUpdateWithoutUserInput, Prisma.PoolUserUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PoolUserCreateWithoutUserInput, Prisma.PoolUserUncheckedCreateWithoutUserInput>;
};
export type PoolUserUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PoolUserWhereUniqueInput;
    data: Prisma.XOR<Prisma.PoolUserUpdateWithoutUserInput, Prisma.PoolUserUncheckedUpdateWithoutUserInput>;
};
export type PoolUserUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PoolUserScalarWhereInput;
    data: Prisma.XOR<Prisma.PoolUserUpdateManyMutationInput, Prisma.PoolUserUncheckedUpdateManyWithoutUserInput>;
};
export type PoolUserScalarWhereInput = {
    AND?: Prisma.PoolUserScalarWhereInput | Prisma.PoolUserScalarWhereInput[];
    OR?: Prisma.PoolUserScalarWhereInput[];
    NOT?: Prisma.PoolUserScalarWhereInput | Prisma.PoolUserScalarWhereInput[];
    id?: Prisma.IntFilter<"PoolUser"> | number;
    poolId?: Prisma.IntFilter<"PoolUser"> | number;
    userId?: Prisma.IntFilter<"PoolUser"> | number;
    status?: Prisma.EnumPoolUserStatusFilter<"PoolUser"> | $Enums.PoolUserStatus;
    joinedAt?: Prisma.DateTimeFilter<"PoolUser"> | Date | string;
};
export type PoolUserCreateWithoutPoolInput = {
    status?: $Enums.PoolUserStatus;
    joinedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPoolUsersInput;
};
export type PoolUserUncheckedCreateWithoutPoolInput = {
    id?: number;
    userId: number;
    status?: $Enums.PoolUserStatus;
    joinedAt?: Date | string;
};
export type PoolUserCreateOrConnectWithoutPoolInput = {
    where: Prisma.PoolUserWhereUniqueInput;
    create: Prisma.XOR<Prisma.PoolUserCreateWithoutPoolInput, Prisma.PoolUserUncheckedCreateWithoutPoolInput>;
};
export type PoolUserCreateManyPoolInputEnvelope = {
    data: Prisma.PoolUserCreateManyPoolInput | Prisma.PoolUserCreateManyPoolInput[];
    skipDuplicates?: boolean;
};
export type PoolUserUpsertWithWhereUniqueWithoutPoolInput = {
    where: Prisma.PoolUserWhereUniqueInput;
    update: Prisma.XOR<Prisma.PoolUserUpdateWithoutPoolInput, Prisma.PoolUserUncheckedUpdateWithoutPoolInput>;
    create: Prisma.XOR<Prisma.PoolUserCreateWithoutPoolInput, Prisma.PoolUserUncheckedCreateWithoutPoolInput>;
};
export type PoolUserUpdateWithWhereUniqueWithoutPoolInput = {
    where: Prisma.PoolUserWhereUniqueInput;
    data: Prisma.XOR<Prisma.PoolUserUpdateWithoutPoolInput, Prisma.PoolUserUncheckedUpdateWithoutPoolInput>;
};
export type PoolUserUpdateManyWithWhereWithoutPoolInput = {
    where: Prisma.PoolUserScalarWhereInput;
    data: Prisma.XOR<Prisma.PoolUserUpdateManyMutationInput, Prisma.PoolUserUncheckedUpdateManyWithoutPoolInput>;
};
export type PoolUserCreateManyUserInput = {
    id?: number;
    poolId: number;
    status?: $Enums.PoolUserStatus;
    joinedAt?: Date | string;
};
export type PoolUserUpdateWithoutUserInput = {
    status?: Prisma.EnumPoolUserStatusFieldUpdateOperationsInput | $Enums.PoolUserStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pool?: Prisma.PoolUpdateOneRequiredWithoutPoolUsersNestedInput;
};
export type PoolUserUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumPoolUserStatusFieldUpdateOperationsInput | $Enums.PoolUserStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PoolUserUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumPoolUserStatusFieldUpdateOperationsInput | $Enums.PoolUserStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PoolUserCreateManyPoolInput = {
    id?: number;
    userId: number;
    status?: $Enums.PoolUserStatus;
    joinedAt?: Date | string;
};
export type PoolUserUpdateWithoutPoolInput = {
    status?: Prisma.EnumPoolUserStatusFieldUpdateOperationsInput | $Enums.PoolUserStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPoolUsersNestedInput;
};
export type PoolUserUncheckedUpdateWithoutPoolInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumPoolUserStatusFieldUpdateOperationsInput | $Enums.PoolUserStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PoolUserUncheckedUpdateManyWithoutPoolInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumPoolUserStatusFieldUpdateOperationsInput | $Enums.PoolUserStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PoolUserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    poolId?: boolean;
    userId?: boolean;
    status?: boolean;
    joinedAt?: boolean;
    pool?: boolean | Prisma.PoolDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["poolUser"]>;
export type PoolUserSelectScalar = {
    id?: boolean;
    poolId?: boolean;
    userId?: boolean;
    status?: boolean;
    joinedAt?: boolean;
};
export type PoolUserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "poolId" | "userId" | "status" | "joinedAt", ExtArgs["result"]["poolUser"]>;
export type PoolUserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pool?: boolean | Prisma.PoolDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PoolUserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PoolUser";
    objects: {
        pool: Prisma.$PoolPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        poolId: number;
        userId: number;
        status: $Enums.PoolUserStatus;
        joinedAt: Date;
    }, ExtArgs["result"]["poolUser"]>;
    composites: {};
};
export type PoolUserGetPayload<S extends boolean | null | undefined | PoolUserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PoolUserPayload, S>;
export type PoolUserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PoolUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PoolUserCountAggregateInputType | true;
};
export interface PoolUserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PoolUser'];
        meta: {
            name: 'PoolUser';
        };
    };
    findUnique<T extends PoolUserFindUniqueArgs>(args: Prisma.SelectSubset<T, PoolUserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PoolUserClient<runtime.Types.Result.GetResult<Prisma.$PoolUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PoolUserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PoolUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PoolUserClient<runtime.Types.Result.GetResult<Prisma.$PoolUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PoolUserFindFirstArgs>(args?: Prisma.SelectSubset<T, PoolUserFindFirstArgs<ExtArgs>>): Prisma.Prisma__PoolUserClient<runtime.Types.Result.GetResult<Prisma.$PoolUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PoolUserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PoolUserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PoolUserClient<runtime.Types.Result.GetResult<Prisma.$PoolUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PoolUserFindManyArgs>(args?: Prisma.SelectSubset<T, PoolUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PoolUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PoolUserCreateArgs>(args: Prisma.SelectSubset<T, PoolUserCreateArgs<ExtArgs>>): Prisma.Prisma__PoolUserClient<runtime.Types.Result.GetResult<Prisma.$PoolUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PoolUserCreateManyArgs>(args?: Prisma.SelectSubset<T, PoolUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends PoolUserDeleteArgs>(args: Prisma.SelectSubset<T, PoolUserDeleteArgs<ExtArgs>>): Prisma.Prisma__PoolUserClient<runtime.Types.Result.GetResult<Prisma.$PoolUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PoolUserUpdateArgs>(args: Prisma.SelectSubset<T, PoolUserUpdateArgs<ExtArgs>>): Prisma.Prisma__PoolUserClient<runtime.Types.Result.GetResult<Prisma.$PoolUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PoolUserDeleteManyArgs>(args?: Prisma.SelectSubset<T, PoolUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PoolUserUpdateManyArgs>(args: Prisma.SelectSubset<T, PoolUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends PoolUserUpsertArgs>(args: Prisma.SelectSubset<T, PoolUserUpsertArgs<ExtArgs>>): Prisma.Prisma__PoolUserClient<runtime.Types.Result.GetResult<Prisma.$PoolUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PoolUserCountArgs>(args?: Prisma.Subset<T, PoolUserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PoolUserCountAggregateOutputType> : number>;
    aggregate<T extends PoolUserAggregateArgs>(args: Prisma.Subset<T, PoolUserAggregateArgs>): Prisma.PrismaPromise<GetPoolUserAggregateType<T>>;
    groupBy<T extends PoolUserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PoolUserGroupByArgs['orderBy'];
    } : {
        orderBy?: PoolUserGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PoolUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPoolUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PoolUserFieldRefs;
}
export interface Prisma__PoolUserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    pool<T extends Prisma.PoolDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PoolDefaultArgs<ExtArgs>>): Prisma.Prisma__PoolClient<runtime.Types.Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PoolUserFieldRefs {
    readonly id: Prisma.FieldRef<"PoolUser", 'Int'>;
    readonly poolId: Prisma.FieldRef<"PoolUser", 'Int'>;
    readonly userId: Prisma.FieldRef<"PoolUser", 'Int'>;
    readonly status: Prisma.FieldRef<"PoolUser", 'PoolUserStatus'>;
    readonly joinedAt: Prisma.FieldRef<"PoolUser", 'DateTime'>;
}
export type PoolUserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolUserSelect<ExtArgs> | null;
    omit?: Prisma.PoolUserOmit<ExtArgs> | null;
    include?: Prisma.PoolUserInclude<ExtArgs> | null;
    where: Prisma.PoolUserWhereUniqueInput;
};
export type PoolUserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolUserSelect<ExtArgs> | null;
    omit?: Prisma.PoolUserOmit<ExtArgs> | null;
    include?: Prisma.PoolUserInclude<ExtArgs> | null;
    where: Prisma.PoolUserWhereUniqueInput;
};
export type PoolUserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PoolUserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PoolUserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PoolUserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolUserSelect<ExtArgs> | null;
    omit?: Prisma.PoolUserOmit<ExtArgs> | null;
    include?: Prisma.PoolUserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PoolUserCreateInput, Prisma.PoolUserUncheckedCreateInput>;
};
export type PoolUserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PoolUserCreateManyInput | Prisma.PoolUserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PoolUserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolUserSelect<ExtArgs> | null;
    omit?: Prisma.PoolUserOmit<ExtArgs> | null;
    include?: Prisma.PoolUserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PoolUserUpdateInput, Prisma.PoolUserUncheckedUpdateInput>;
    where: Prisma.PoolUserWhereUniqueInput;
};
export type PoolUserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PoolUserUpdateManyMutationInput, Prisma.PoolUserUncheckedUpdateManyInput>;
    where?: Prisma.PoolUserWhereInput;
    limit?: number;
};
export type PoolUserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolUserSelect<ExtArgs> | null;
    omit?: Prisma.PoolUserOmit<ExtArgs> | null;
    include?: Prisma.PoolUserInclude<ExtArgs> | null;
    where: Prisma.PoolUserWhereUniqueInput;
    create: Prisma.XOR<Prisma.PoolUserCreateInput, Prisma.PoolUserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PoolUserUpdateInput, Prisma.PoolUserUncheckedUpdateInput>;
};
export type PoolUserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolUserSelect<ExtArgs> | null;
    omit?: Prisma.PoolUserOmit<ExtArgs> | null;
    include?: Prisma.PoolUserInclude<ExtArgs> | null;
    where: Prisma.PoolUserWhereUniqueInput;
};
export type PoolUserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PoolUserWhereInput;
    limit?: number;
};
export type PoolUserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PoolUserSelect<ExtArgs> | null;
    omit?: Prisma.PoolUserOmit<ExtArgs> | null;
    include?: Prisma.PoolUserInclude<ExtArgs> | null;
};
