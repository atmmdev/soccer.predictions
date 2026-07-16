import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserAvgAggregateOutputType = {
    id: number | null;
};
export type UserSumAggregateOutputType = {
    id: number | null;
};
export type UserMinAggregateOutputType = {
    id: number | null;
    email: string | null;
    name: string | null;
    phone: string | null;
    avatarDataUrl: string | null;
    password: string | null;
    authProvider: $Enums.AuthProvider | null;
    providerId: string | null;
    role: $Enums.UserRole | null;
    emailVerifiedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: number | null;
    email: string | null;
    name: string | null;
    phone: string | null;
    avatarDataUrl: string | null;
    password: string | null;
    authProvider: $Enums.AuthProvider | null;
    providerId: string | null;
    role: $Enums.UserRole | null;
    emailVerifiedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    name: number;
    phone: number;
    avatarDataUrl: number;
    password: number;
    authProvider: number;
    providerId: number;
    role: number;
    emailVerifiedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserAvgAggregateInputType = {
    id?: true;
};
export type UserSumAggregateInputType = {
    id?: true;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    phone?: true;
    avatarDataUrl?: true;
    password?: true;
    authProvider?: true;
    providerId?: true;
    role?: true;
    emailVerifiedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    phone?: true;
    avatarDataUrl?: true;
    password?: true;
    authProvider?: true;
    providerId?: true;
    role?: true;
    emailVerifiedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    phone?: true;
    avatarDataUrl?: true;
    password?: true;
    authProvider?: true;
    providerId?: true;
    role?: true;
    emailVerifiedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserCountAggregateInputType;
    _avg?: UserAvgAggregateInputType;
    _sum?: UserSumAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _avg?: UserAvgAggregateInputType;
    _sum?: UserSumAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: number;
    email: string;
    name: string;
    phone: string | null;
    avatarDataUrl: string | null;
    password: string | null;
    authProvider: $Enums.AuthProvider;
    providerId: string | null;
    role: $Enums.UserRole;
    emailVerifiedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.IntFilter<"User"> | number;
    email?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    phone?: Prisma.StringNullableFilter<"User"> | string | null;
    avatarDataUrl?: Prisma.StringNullableFilter<"User"> | string | null;
    password?: Prisma.StringNullableFilter<"User"> | string | null;
    authProvider?: Prisma.EnumAuthProviderFilter<"User"> | $Enums.AuthProvider;
    providerId?: Prisma.StringNullableFilter<"User"> | string | null;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    emailVerifiedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    poolUsers?: Prisma.PoolUserListRelationFilter;
    ownedPools?: Prisma.PoolListRelationFilter;
    predictions?: Prisma.PredictionListRelationFilter;
    pointHistory?: Prisma.PointHistoryListRelationFilter;
    passwordResetTokens?: Prisma.PasswordResetTokenListRelationFilter;
    emailVerificationTokens?: Prisma.EmailVerificationTokenListRelationFilter;
    emailDispatchLogs?: Prisma.EmailDispatchLogListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    avatarDataUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    password?: Prisma.SortOrderInput | Prisma.SortOrder;
    authProvider?: Prisma.SortOrder;
    providerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    poolUsers?: Prisma.PoolUserOrderByRelationAggregateInput;
    ownedPools?: Prisma.PoolOrderByRelationAggregateInput;
    predictions?: Prisma.PredictionOrderByRelationAggregateInput;
    pointHistory?: Prisma.PointHistoryOrderByRelationAggregateInput;
    passwordResetTokens?: Prisma.PasswordResetTokenOrderByRelationAggregateInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenOrderByRelationAggregateInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogOrderByRelationAggregateInput;
    _relevance?: Prisma.UserOrderByRelevanceInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    email?: string;
    authProvider_providerId?: Prisma.UserAuthProviderProviderIdCompoundUniqueInput;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    name?: Prisma.StringFilter<"User"> | string;
    phone?: Prisma.StringNullableFilter<"User"> | string | null;
    avatarDataUrl?: Prisma.StringNullableFilter<"User"> | string | null;
    password?: Prisma.StringNullableFilter<"User"> | string | null;
    authProvider?: Prisma.EnumAuthProviderFilter<"User"> | $Enums.AuthProvider;
    providerId?: Prisma.StringNullableFilter<"User"> | string | null;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    emailVerifiedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    poolUsers?: Prisma.PoolUserListRelationFilter;
    ownedPools?: Prisma.PoolListRelationFilter;
    predictions?: Prisma.PredictionListRelationFilter;
    pointHistory?: Prisma.PointHistoryListRelationFilter;
    passwordResetTokens?: Prisma.PasswordResetTokenListRelationFilter;
    emailVerificationTokens?: Prisma.EmailVerificationTokenListRelationFilter;
    emailDispatchLogs?: Prisma.EmailDispatchLogListRelationFilter;
}, "id" | "email" | "authProvider_providerId">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    avatarDataUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    password?: Prisma.SortOrderInput | Prisma.SortOrder;
    authProvider?: Prisma.SortOrder;
    providerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _avg?: Prisma.UserAvgOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
    _sum?: Prisma.UserSumOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"User"> | number;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    name?: Prisma.StringWithAggregatesFilter<"User"> | string;
    phone?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    avatarDataUrl?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    password?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    authProvider?: Prisma.EnumAuthProviderWithAggregatesFilter<"User"> | $Enums.AuthProvider;
    providerId?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    role?: Prisma.EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole;
    emailVerifiedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    email: string;
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
    password?: string | null;
    authProvider?: $Enums.AuthProvider;
    providerId?: string | null;
    role?: $Enums.UserRole;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserCreateNestedManyWithoutUserInput;
    ownedPools?: Prisma.PoolCreateNestedManyWithoutOwnerInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutUserInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: number;
    email: string;
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
    password?: string | null;
    authProvider?: $Enums.AuthProvider;
    providerId?: string | null;
    role?: $Enums.UserRole;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserUncheckedCreateNestedManyWithoutUserInput;
    ownedPools?: Prisma.PoolUncheckedCreateNestedManyWithoutOwnerInput;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutUserInput;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUncheckedCreateNestedManyWithoutUserInput;
};
export type UserUpdateInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUpdateManyWithoutUserNestedInput;
    ownedPools?: Prisma.PoolUpdateManyWithoutOwnerNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutUserNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUncheckedUpdateManyWithoutUserNestedInput;
    ownedPools?: Prisma.PoolUncheckedUpdateManyWithoutOwnerNestedInput;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutUserNestedInput;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: number;
    email: string;
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
    password?: string | null;
    authProvider?: $Enums.AuthProvider;
    providerId?: string | null;
    role?: $Enums.UserRole;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserOrderByRelevanceInput = {
    fields: Prisma.UserOrderByRelevanceFieldEnum | Prisma.UserOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type UserAuthProviderProviderIdCompoundUniqueInput = {
    authProvider: $Enums.AuthProvider;
    providerId: string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    avatarDataUrl?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    authProvider?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    avatarDataUrl?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    authProvider?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    avatarDataUrl?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    authProvider?: Prisma.SortOrder;
    providerId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type EnumAuthProviderFieldUpdateOperationsInput = {
    set?: $Enums.AuthProvider;
};
export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type UserCreateNestedOneWithoutPasswordResetTokensInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetTokensInput, Prisma.UserUncheckedCreateWithoutPasswordResetTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPasswordResetTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPasswordResetTokensNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetTokensInput, Prisma.UserUncheckedCreateWithoutPasswordResetTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPasswordResetTokensInput;
    upsert?: Prisma.UserUpsertWithoutPasswordResetTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPasswordResetTokensInput, Prisma.UserUpdateWithoutPasswordResetTokensInput>, Prisma.UserUncheckedUpdateWithoutPasswordResetTokensInput>;
};
export type UserCreateNestedOneWithoutEmailVerificationTokensInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEmailVerificationTokensInput, Prisma.UserUncheckedCreateWithoutEmailVerificationTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEmailVerificationTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutEmailVerificationTokensNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEmailVerificationTokensInput, Prisma.UserUncheckedCreateWithoutEmailVerificationTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEmailVerificationTokensInput;
    upsert?: Prisma.UserUpsertWithoutEmailVerificationTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutEmailVerificationTokensInput, Prisma.UserUpdateWithoutEmailVerificationTokensInput>, Prisma.UserUncheckedUpdateWithoutEmailVerificationTokensInput>;
};
export type UserCreateNestedOneWithoutEmailDispatchLogsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEmailDispatchLogsInput, Prisma.UserUncheckedCreateWithoutEmailDispatchLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEmailDispatchLogsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutEmailDispatchLogsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEmailDispatchLogsInput, Prisma.UserUncheckedCreateWithoutEmailDispatchLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEmailDispatchLogsInput;
    upsert?: Prisma.UserUpsertWithoutEmailDispatchLogsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutEmailDispatchLogsInput, Prisma.UserUpdateWithoutEmailDispatchLogsInput>, Prisma.UserUncheckedUpdateWithoutEmailDispatchLogsInput>;
};
export type UserCreateNestedOneWithoutOwnedPoolsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOwnedPoolsInput, Prisma.UserUncheckedCreateWithoutOwnedPoolsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOwnedPoolsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutOwnedPoolsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOwnedPoolsInput, Prisma.UserUncheckedCreateWithoutOwnedPoolsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOwnedPoolsInput;
    upsert?: Prisma.UserUpsertWithoutOwnedPoolsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOwnedPoolsInput, Prisma.UserUpdateWithoutOwnedPoolsInput>, Prisma.UserUncheckedUpdateWithoutOwnedPoolsInput>;
};
export type UserCreateNestedOneWithoutPoolUsersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPoolUsersInput, Prisma.UserUncheckedCreateWithoutPoolUsersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPoolUsersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPoolUsersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPoolUsersInput, Prisma.UserUncheckedCreateWithoutPoolUsersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPoolUsersInput;
    upsert?: Prisma.UserUpsertWithoutPoolUsersInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPoolUsersInput, Prisma.UserUpdateWithoutPoolUsersInput>, Prisma.UserUncheckedUpdateWithoutPoolUsersInput>;
};
export type UserCreateNestedOneWithoutPredictionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPredictionsInput, Prisma.UserUncheckedCreateWithoutPredictionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPredictionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPredictionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPredictionsInput, Prisma.UserUncheckedCreateWithoutPredictionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPredictionsInput;
    upsert?: Prisma.UserUpsertWithoutPredictionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPredictionsInput, Prisma.UserUpdateWithoutPredictionsInput>, Prisma.UserUncheckedUpdateWithoutPredictionsInput>;
};
export type UserCreateNestedOneWithoutPointHistoryInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPointHistoryInput, Prisma.UserUncheckedCreateWithoutPointHistoryInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPointHistoryInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPointHistoryNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPointHistoryInput, Prisma.UserUncheckedCreateWithoutPointHistoryInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPointHistoryInput;
    upsert?: Prisma.UserUpsertWithoutPointHistoryInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPointHistoryInput, Prisma.UserUpdateWithoutPointHistoryInput>, Prisma.UserUncheckedUpdateWithoutPointHistoryInput>;
};
export type UserCreateWithoutPasswordResetTokensInput = {
    email: string;
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
    password?: string | null;
    authProvider?: $Enums.AuthProvider;
    providerId?: string | null;
    role?: $Enums.UserRole;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserCreateNestedManyWithoutUserInput;
    ownedPools?: Prisma.PoolCreateNestedManyWithoutOwnerInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutUserInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutPasswordResetTokensInput = {
    id?: number;
    email: string;
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
    password?: string | null;
    authProvider?: $Enums.AuthProvider;
    providerId?: string | null;
    role?: $Enums.UserRole;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserUncheckedCreateNestedManyWithoutUserInput;
    ownedPools?: Prisma.PoolUncheckedCreateNestedManyWithoutOwnerInput;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutUserInput;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutPasswordResetTokensInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetTokensInput, Prisma.UserUncheckedCreateWithoutPasswordResetTokensInput>;
};
export type UserUpsertWithoutPasswordResetTokensInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPasswordResetTokensInput, Prisma.UserUncheckedUpdateWithoutPasswordResetTokensInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetTokensInput, Prisma.UserUncheckedCreateWithoutPasswordResetTokensInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPasswordResetTokensInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPasswordResetTokensInput, Prisma.UserUncheckedUpdateWithoutPasswordResetTokensInput>;
};
export type UserUpdateWithoutPasswordResetTokensInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUpdateManyWithoutUserNestedInput;
    ownedPools?: Prisma.PoolUpdateManyWithoutOwnerNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutUserNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutPasswordResetTokensInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUncheckedUpdateManyWithoutUserNestedInput;
    ownedPools?: Prisma.PoolUncheckedUpdateManyWithoutOwnerNestedInput;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutUserNestedInput;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutEmailVerificationTokensInput = {
    email: string;
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
    password?: string | null;
    authProvider?: $Enums.AuthProvider;
    providerId?: string | null;
    role?: $Enums.UserRole;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserCreateNestedManyWithoutUserInput;
    ownedPools?: Prisma.PoolCreateNestedManyWithoutOwnerInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutUserInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutEmailVerificationTokensInput = {
    id?: number;
    email: string;
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
    password?: string | null;
    authProvider?: $Enums.AuthProvider;
    providerId?: string | null;
    role?: $Enums.UserRole;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserUncheckedCreateNestedManyWithoutUserInput;
    ownedPools?: Prisma.PoolUncheckedCreateNestedManyWithoutOwnerInput;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutUserInput;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutEmailVerificationTokensInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutEmailVerificationTokensInput, Prisma.UserUncheckedCreateWithoutEmailVerificationTokensInput>;
};
export type UserUpsertWithoutEmailVerificationTokensInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutEmailVerificationTokensInput, Prisma.UserUncheckedUpdateWithoutEmailVerificationTokensInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutEmailVerificationTokensInput, Prisma.UserUncheckedCreateWithoutEmailVerificationTokensInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutEmailVerificationTokensInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutEmailVerificationTokensInput, Prisma.UserUncheckedUpdateWithoutEmailVerificationTokensInput>;
};
export type UserUpdateWithoutEmailVerificationTokensInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUpdateManyWithoutUserNestedInput;
    ownedPools?: Prisma.PoolUpdateManyWithoutOwnerNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutUserNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutEmailVerificationTokensInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUncheckedUpdateManyWithoutUserNestedInput;
    ownedPools?: Prisma.PoolUncheckedUpdateManyWithoutOwnerNestedInput;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutUserNestedInput;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutEmailDispatchLogsInput = {
    email: string;
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
    password?: string | null;
    authProvider?: $Enums.AuthProvider;
    providerId?: string | null;
    role?: $Enums.UserRole;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserCreateNestedManyWithoutUserInput;
    ownedPools?: Prisma.PoolCreateNestedManyWithoutOwnerInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutUserInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutEmailDispatchLogsInput = {
    id?: number;
    email: string;
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
    password?: string | null;
    authProvider?: $Enums.AuthProvider;
    providerId?: string | null;
    role?: $Enums.UserRole;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserUncheckedCreateNestedManyWithoutUserInput;
    ownedPools?: Prisma.PoolUncheckedCreateNestedManyWithoutOwnerInput;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutUserInput;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutEmailDispatchLogsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutEmailDispatchLogsInput, Prisma.UserUncheckedCreateWithoutEmailDispatchLogsInput>;
};
export type UserUpsertWithoutEmailDispatchLogsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutEmailDispatchLogsInput, Prisma.UserUncheckedUpdateWithoutEmailDispatchLogsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutEmailDispatchLogsInput, Prisma.UserUncheckedCreateWithoutEmailDispatchLogsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutEmailDispatchLogsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutEmailDispatchLogsInput, Prisma.UserUncheckedUpdateWithoutEmailDispatchLogsInput>;
};
export type UserUpdateWithoutEmailDispatchLogsInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUpdateManyWithoutUserNestedInput;
    ownedPools?: Prisma.PoolUpdateManyWithoutOwnerNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutUserNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutEmailDispatchLogsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUncheckedUpdateManyWithoutUserNestedInput;
    ownedPools?: Prisma.PoolUncheckedUpdateManyWithoutOwnerNestedInput;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutUserNestedInput;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutOwnedPoolsInput = {
    email: string;
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
    password?: string | null;
    authProvider?: $Enums.AuthProvider;
    providerId?: string | null;
    role?: $Enums.UserRole;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserCreateNestedManyWithoutUserInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutUserInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutOwnedPoolsInput = {
    id?: number;
    email: string;
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
    password?: string | null;
    authProvider?: $Enums.AuthProvider;
    providerId?: string | null;
    role?: $Enums.UserRole;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserUncheckedCreateNestedManyWithoutUserInput;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutUserInput;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutOwnedPoolsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOwnedPoolsInput, Prisma.UserUncheckedCreateWithoutOwnedPoolsInput>;
};
export type UserUpsertWithoutOwnedPoolsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOwnedPoolsInput, Prisma.UserUncheckedUpdateWithoutOwnedPoolsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOwnedPoolsInput, Prisma.UserUncheckedCreateWithoutOwnedPoolsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOwnedPoolsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOwnedPoolsInput, Prisma.UserUncheckedUpdateWithoutOwnedPoolsInput>;
};
export type UserUpdateWithoutOwnedPoolsInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUpdateManyWithoutUserNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutUserNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutOwnedPoolsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUncheckedUpdateManyWithoutUserNestedInput;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutUserNestedInput;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutPoolUsersInput = {
    email: string;
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
    password?: string | null;
    authProvider?: $Enums.AuthProvider;
    providerId?: string | null;
    role?: $Enums.UserRole;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    ownedPools?: Prisma.PoolCreateNestedManyWithoutOwnerInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutUserInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutPoolUsersInput = {
    id?: number;
    email: string;
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
    password?: string | null;
    authProvider?: $Enums.AuthProvider;
    providerId?: string | null;
    role?: $Enums.UserRole;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    ownedPools?: Prisma.PoolUncheckedCreateNestedManyWithoutOwnerInput;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutUserInput;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutPoolUsersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPoolUsersInput, Prisma.UserUncheckedCreateWithoutPoolUsersInput>;
};
export type UserUpsertWithoutPoolUsersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPoolUsersInput, Prisma.UserUncheckedUpdateWithoutPoolUsersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPoolUsersInput, Prisma.UserUncheckedCreateWithoutPoolUsersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPoolUsersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPoolUsersInput, Prisma.UserUncheckedUpdateWithoutPoolUsersInput>;
};
export type UserUpdateWithoutPoolUsersInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownedPools?: Prisma.PoolUpdateManyWithoutOwnerNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutUserNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutPoolUsersInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownedPools?: Prisma.PoolUncheckedUpdateManyWithoutOwnerNestedInput;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutUserNestedInput;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutPredictionsInput = {
    email: string;
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
    password?: string | null;
    authProvider?: $Enums.AuthProvider;
    providerId?: string | null;
    role?: $Enums.UserRole;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserCreateNestedManyWithoutUserInput;
    ownedPools?: Prisma.PoolCreateNestedManyWithoutOwnerInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutPredictionsInput = {
    id?: number;
    email: string;
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
    password?: string | null;
    authProvider?: $Enums.AuthProvider;
    providerId?: string | null;
    role?: $Enums.UserRole;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserUncheckedCreateNestedManyWithoutUserInput;
    ownedPools?: Prisma.PoolUncheckedCreateNestedManyWithoutOwnerInput;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutPredictionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPredictionsInput, Prisma.UserUncheckedCreateWithoutPredictionsInput>;
};
export type UserUpsertWithoutPredictionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPredictionsInput, Prisma.UserUncheckedUpdateWithoutPredictionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPredictionsInput, Prisma.UserUncheckedCreateWithoutPredictionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPredictionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPredictionsInput, Prisma.UserUncheckedUpdateWithoutPredictionsInput>;
};
export type UserUpdateWithoutPredictionsInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUpdateManyWithoutUserNestedInput;
    ownedPools?: Prisma.PoolUpdateManyWithoutOwnerNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutPredictionsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUncheckedUpdateManyWithoutUserNestedInput;
    ownedPools?: Prisma.PoolUncheckedUpdateManyWithoutOwnerNestedInput;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutPointHistoryInput = {
    email: string;
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
    password?: string | null;
    authProvider?: $Enums.AuthProvider;
    providerId?: string | null;
    role?: $Enums.UserRole;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserCreateNestedManyWithoutUserInput;
    ownedPools?: Prisma.PoolCreateNestedManyWithoutOwnerInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutPointHistoryInput = {
    id?: number;
    email: string;
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
    password?: string | null;
    authProvider?: $Enums.AuthProvider;
    providerId?: string | null;
    role?: $Enums.UserRole;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    poolUsers?: Prisma.PoolUserUncheckedCreateNestedManyWithoutUserInput;
    ownedPools?: Prisma.PoolUncheckedCreateNestedManyWithoutOwnerInput;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutUserInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutPointHistoryInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPointHistoryInput, Prisma.UserUncheckedCreateWithoutPointHistoryInput>;
};
export type UserUpsertWithoutPointHistoryInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPointHistoryInput, Prisma.UserUncheckedUpdateWithoutPointHistoryInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPointHistoryInput, Prisma.UserUncheckedCreateWithoutPointHistoryInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPointHistoryInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPointHistoryInput, Prisma.UserUncheckedUpdateWithoutPointHistoryInput>;
};
export type UserUpdateWithoutPointHistoryInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUpdateManyWithoutUserNestedInput;
    ownedPools?: Prisma.PoolUpdateManyWithoutOwnerNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutPointHistoryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarDataUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authProvider?: Prisma.EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider;
    providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poolUsers?: Prisma.PoolUserUncheckedUpdateManyWithoutUserNestedInput;
    ownedPools?: Prisma.PoolUncheckedUpdateManyWithoutOwnerNestedInput;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutUserNestedInput;
    passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    emailVerificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    emailDispatchLogs?: Prisma.EmailDispatchLogUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCountOutputType = {
    poolUsers: number;
    ownedPools: number;
    predictions: number;
    pointHistory: number;
    passwordResetTokens: number;
    emailVerificationTokens: number;
    emailDispatchLogs: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    poolUsers?: boolean | UserCountOutputTypeCountPoolUsersArgs;
    ownedPools?: boolean | UserCountOutputTypeCountOwnedPoolsArgs;
    predictions?: boolean | UserCountOutputTypeCountPredictionsArgs;
    pointHistory?: boolean | UserCountOutputTypeCountPointHistoryArgs;
    passwordResetTokens?: boolean | UserCountOutputTypeCountPasswordResetTokensArgs;
    emailVerificationTokens?: boolean | UserCountOutputTypeCountEmailVerificationTokensArgs;
    emailDispatchLogs?: boolean | UserCountOutputTypeCountEmailDispatchLogsArgs;
};
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
export type UserCountOutputTypeCountPoolUsersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PoolUserWhereInput;
};
export type UserCountOutputTypeCountOwnedPoolsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PoolWhereInput;
};
export type UserCountOutputTypeCountPredictionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PredictionWhereInput;
};
export type UserCountOutputTypeCountPointHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PointHistoryWhereInput;
};
export type UserCountOutputTypeCountPasswordResetTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PasswordResetTokenWhereInput;
};
export type UserCountOutputTypeCountEmailVerificationTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailVerificationTokenWhereInput;
};
export type UserCountOutputTypeCountEmailDispatchLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailDispatchLogWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    name?: boolean;
    phone?: boolean;
    avatarDataUrl?: boolean;
    password?: boolean;
    authProvider?: boolean;
    providerId?: boolean;
    role?: boolean;
    emailVerifiedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    poolUsers?: boolean | Prisma.User$poolUsersArgs<ExtArgs>;
    ownedPools?: boolean | Prisma.User$ownedPoolsArgs<ExtArgs>;
    predictions?: boolean | Prisma.User$predictionsArgs<ExtArgs>;
    pointHistory?: boolean | Prisma.User$pointHistoryArgs<ExtArgs>;
    passwordResetTokens?: boolean | Prisma.User$passwordResetTokensArgs<ExtArgs>;
    emailVerificationTokens?: boolean | Prisma.User$emailVerificationTokensArgs<ExtArgs>;
    emailDispatchLogs?: boolean | Prisma.User$emailDispatchLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    name?: boolean;
    phone?: boolean;
    avatarDataUrl?: boolean;
    password?: boolean;
    authProvider?: boolean;
    providerId?: boolean;
    role?: boolean;
    emailVerifiedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "name" | "phone" | "avatarDataUrl" | "password" | "authProvider" | "providerId" | "role" | "emailVerifiedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    poolUsers?: boolean | Prisma.User$poolUsersArgs<ExtArgs>;
    ownedPools?: boolean | Prisma.User$ownedPoolsArgs<ExtArgs>;
    predictions?: boolean | Prisma.User$predictionsArgs<ExtArgs>;
    pointHistory?: boolean | Prisma.User$pointHistoryArgs<ExtArgs>;
    passwordResetTokens?: boolean | Prisma.User$passwordResetTokensArgs<ExtArgs>;
    emailVerificationTokens?: boolean | Prisma.User$emailVerificationTokensArgs<ExtArgs>;
    emailDispatchLogs?: boolean | Prisma.User$emailDispatchLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        poolUsers: Prisma.$PoolUserPayload<ExtArgs>[];
        ownedPools: Prisma.$PoolPayload<ExtArgs>[];
        predictions: Prisma.$PredictionPayload<ExtArgs>[];
        pointHistory: Prisma.$PointHistoryPayload<ExtArgs>[];
        passwordResetTokens: Prisma.$PasswordResetTokenPayload<ExtArgs>[];
        emailVerificationTokens: Prisma.$EmailVerificationTokenPayload<ExtArgs>[];
        emailDispatchLogs: Prisma.$EmailDispatchLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        email: string;
        name: string;
        phone: string | null;
        avatarDataUrl: string | null;
        password: string | null;
        authProvider: $Enums.AuthProvider;
        providerId: string | null;
        role: $Enums.UserRole;
        emailVerifiedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserFieldRefs;
}
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    poolUsers<T extends Prisma.User$poolUsersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$poolUsersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PoolUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    ownedPools<T extends Prisma.User$ownedPoolsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$ownedPoolsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    predictions<T extends Prisma.User$predictionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$predictionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    pointHistory<T extends Prisma.User$pointHistoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$pointHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PointHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    passwordResetTokens<T extends Prisma.User$passwordResetTokensArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$passwordResetTokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    emailVerificationTokens<T extends Prisma.User$emailVerificationTokensArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$emailVerificationTokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailVerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    emailDispatchLogs<T extends Prisma.User$emailDispatchLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$emailDispatchLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailDispatchLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'Int'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly phone: Prisma.FieldRef<"User", 'String'>;
    readonly avatarDataUrl: Prisma.FieldRef<"User", 'String'>;
    readonly password: Prisma.FieldRef<"User", 'String'>;
    readonly authProvider: Prisma.FieldRef<"User", 'AuthProvider'>;
    readonly providerId: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'UserRole'>;
    readonly emailVerifiedAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    where: Prisma.UserWhereUniqueInput;
};
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type User$poolUsersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type User$ownedPoolsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type User$predictionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type User$pointHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type User$passwordResetTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PasswordResetTokenSelect<ExtArgs> | null;
    omit?: Prisma.PasswordResetTokenOmit<ExtArgs> | null;
    include?: Prisma.PasswordResetTokenInclude<ExtArgs> | null;
    where?: Prisma.PasswordResetTokenWhereInput;
    orderBy?: Prisma.PasswordResetTokenOrderByWithRelationInput | Prisma.PasswordResetTokenOrderByWithRelationInput[];
    cursor?: Prisma.PasswordResetTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PasswordResetTokenScalarFieldEnum | Prisma.PasswordResetTokenScalarFieldEnum[];
};
export type User$emailVerificationTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailVerificationTokenSelect<ExtArgs> | null;
    omit?: Prisma.EmailVerificationTokenOmit<ExtArgs> | null;
    include?: Prisma.EmailVerificationTokenInclude<ExtArgs> | null;
    where?: Prisma.EmailVerificationTokenWhereInput;
    orderBy?: Prisma.EmailVerificationTokenOrderByWithRelationInput | Prisma.EmailVerificationTokenOrderByWithRelationInput[];
    cursor?: Prisma.EmailVerificationTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailVerificationTokenScalarFieldEnum | Prisma.EmailVerificationTokenScalarFieldEnum[];
};
export type User$emailDispatchLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailDispatchLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailDispatchLogOmit<ExtArgs> | null;
    include?: Prisma.EmailDispatchLogInclude<ExtArgs> | null;
    where?: Prisma.EmailDispatchLogWhereInput;
    orderBy?: Prisma.EmailDispatchLogOrderByWithRelationInput | Prisma.EmailDispatchLogOrderByWithRelationInput[];
    cursor?: Prisma.EmailDispatchLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailDispatchLogScalarFieldEnum | Prisma.EmailDispatchLogScalarFieldEnum[];
};
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
};
