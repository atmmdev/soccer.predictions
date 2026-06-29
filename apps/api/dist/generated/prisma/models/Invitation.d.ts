import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type InvitationModel = runtime.Types.Result.DefaultSelection<Prisma.$InvitationPayload>;
export type AggregateInvitation = {
    _count: InvitationCountAggregateOutputType | null;
    _avg: InvitationAvgAggregateOutputType | null;
    _sum: InvitationSumAggregateOutputType | null;
    _min: InvitationMinAggregateOutputType | null;
    _max: InvitationMaxAggregateOutputType | null;
};
export type InvitationAvgAggregateOutputType = {
    id: number | null;
    poolId: number | null;
};
export type InvitationSumAggregateOutputType = {
    id: number | null;
    poolId: number | null;
};
export type InvitationMinAggregateOutputType = {
    id: number | null;
    poolId: number | null;
    code: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
};
export type InvitationMaxAggregateOutputType = {
    id: number | null;
    poolId: number | null;
    code: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
};
export type InvitationCountAggregateOutputType = {
    id: number;
    poolId: number;
    code: number;
    expiresAt: number;
    createdAt: number;
    _all: number;
};
export type InvitationAvgAggregateInputType = {
    id?: true;
    poolId?: true;
};
export type InvitationSumAggregateInputType = {
    id?: true;
    poolId?: true;
};
export type InvitationMinAggregateInputType = {
    id?: true;
    poolId?: true;
    code?: true;
    expiresAt?: true;
    createdAt?: true;
};
export type InvitationMaxAggregateInputType = {
    id?: true;
    poolId?: true;
    code?: true;
    expiresAt?: true;
    createdAt?: true;
};
export type InvitationCountAggregateInputType = {
    id?: true;
    poolId?: true;
    code?: true;
    expiresAt?: true;
    createdAt?: true;
    _all?: true;
};
export type InvitationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvitationWhereInput;
    orderBy?: Prisma.InvitationOrderByWithRelationInput | Prisma.InvitationOrderByWithRelationInput[];
    cursor?: Prisma.InvitationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InvitationCountAggregateInputType;
    _avg?: InvitationAvgAggregateInputType;
    _sum?: InvitationSumAggregateInputType;
    _min?: InvitationMinAggregateInputType;
    _max?: InvitationMaxAggregateInputType;
};
export type GetInvitationAggregateType<T extends InvitationAggregateArgs> = {
    [P in keyof T & keyof AggregateInvitation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInvitation[P]> : Prisma.GetScalarType<T[P], AggregateInvitation[P]>;
};
export type InvitationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvitationWhereInput;
    orderBy?: Prisma.InvitationOrderByWithAggregationInput | Prisma.InvitationOrderByWithAggregationInput[];
    by: Prisma.InvitationScalarFieldEnum[] | Prisma.InvitationScalarFieldEnum;
    having?: Prisma.InvitationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InvitationCountAggregateInputType | true;
    _avg?: InvitationAvgAggregateInputType;
    _sum?: InvitationSumAggregateInputType;
    _min?: InvitationMinAggregateInputType;
    _max?: InvitationMaxAggregateInputType;
};
export type InvitationGroupByOutputType = {
    id: number;
    poolId: number;
    code: string;
    expiresAt: Date | null;
    createdAt: Date;
    _count: InvitationCountAggregateOutputType | null;
    _avg: InvitationAvgAggregateOutputType | null;
    _sum: InvitationSumAggregateOutputType | null;
    _min: InvitationMinAggregateOutputType | null;
    _max: InvitationMaxAggregateOutputType | null;
};
export type GetInvitationGroupByPayload<T extends InvitationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InvitationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InvitationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InvitationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InvitationGroupByOutputType[P]>;
}>>;
export type InvitationWhereInput = {
    AND?: Prisma.InvitationWhereInput | Prisma.InvitationWhereInput[];
    OR?: Prisma.InvitationWhereInput[];
    NOT?: Prisma.InvitationWhereInput | Prisma.InvitationWhereInput[];
    id?: Prisma.IntFilter<"Invitation"> | number;
    poolId?: Prisma.IntFilter<"Invitation"> | number;
    code?: Prisma.StringFilter<"Invitation"> | string;
    expiresAt?: Prisma.DateTimeNullableFilter<"Invitation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Invitation"> | Date | string;
    pool?: Prisma.XOR<Prisma.PoolScalarRelationFilter, Prisma.PoolWhereInput>;
};
export type InvitationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    pool?: Prisma.PoolOrderByWithRelationInput;
    _relevance?: Prisma.InvitationOrderByRelevanceInput;
};
export type InvitationWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    code?: string;
    AND?: Prisma.InvitationWhereInput | Prisma.InvitationWhereInput[];
    OR?: Prisma.InvitationWhereInput[];
    NOT?: Prisma.InvitationWhereInput | Prisma.InvitationWhereInput[];
    poolId?: Prisma.IntFilter<"Invitation"> | number;
    expiresAt?: Prisma.DateTimeNullableFilter<"Invitation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Invitation"> | Date | string;
    pool?: Prisma.XOR<Prisma.PoolScalarRelationFilter, Prisma.PoolWhereInput>;
}, "id" | "code">;
export type InvitationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.InvitationCountOrderByAggregateInput;
    _avg?: Prisma.InvitationAvgOrderByAggregateInput;
    _max?: Prisma.InvitationMaxOrderByAggregateInput;
    _min?: Prisma.InvitationMinOrderByAggregateInput;
    _sum?: Prisma.InvitationSumOrderByAggregateInput;
};
export type InvitationScalarWhereWithAggregatesInput = {
    AND?: Prisma.InvitationScalarWhereWithAggregatesInput | Prisma.InvitationScalarWhereWithAggregatesInput[];
    OR?: Prisma.InvitationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InvitationScalarWhereWithAggregatesInput | Prisma.InvitationScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Invitation"> | number;
    poolId?: Prisma.IntWithAggregatesFilter<"Invitation"> | number;
    code?: Prisma.StringWithAggregatesFilter<"Invitation"> | string;
    expiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Invitation"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Invitation"> | Date | string;
};
export type InvitationCreateInput = {
    code: string;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    pool: Prisma.PoolCreateNestedOneWithoutInvitationsInput;
};
export type InvitationUncheckedCreateInput = {
    id?: number;
    poolId: number;
    code: string;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
};
export type InvitationUpdateInput = {
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pool?: Prisma.PoolUpdateOneRequiredWithoutInvitationsNestedInput;
};
export type InvitationUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvitationCreateManyInput = {
    id?: number;
    poolId: number;
    code: string;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
};
export type InvitationUpdateManyMutationInput = {
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvitationUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    poolId?: Prisma.IntFieldUpdateOperationsInput | number;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvitationListRelationFilter = {
    every?: Prisma.InvitationWhereInput;
    some?: Prisma.InvitationWhereInput;
    none?: Prisma.InvitationWhereInput;
};
export type InvitationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InvitationOrderByRelevanceInput = {
    fields: Prisma.InvitationOrderByRelevanceFieldEnum | Prisma.InvitationOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type InvitationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InvitationAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
};
export type InvitationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InvitationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InvitationSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
};
export type InvitationCreateNestedManyWithoutPoolInput = {
    create?: Prisma.XOR<Prisma.InvitationCreateWithoutPoolInput, Prisma.InvitationUncheckedCreateWithoutPoolInput> | Prisma.InvitationCreateWithoutPoolInput[] | Prisma.InvitationUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.InvitationCreateOrConnectWithoutPoolInput | Prisma.InvitationCreateOrConnectWithoutPoolInput[];
    createMany?: Prisma.InvitationCreateManyPoolInputEnvelope;
    connect?: Prisma.InvitationWhereUniqueInput | Prisma.InvitationWhereUniqueInput[];
};
export type InvitationUncheckedCreateNestedManyWithoutPoolInput = {
    create?: Prisma.XOR<Prisma.InvitationCreateWithoutPoolInput, Prisma.InvitationUncheckedCreateWithoutPoolInput> | Prisma.InvitationCreateWithoutPoolInput[] | Prisma.InvitationUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.InvitationCreateOrConnectWithoutPoolInput | Prisma.InvitationCreateOrConnectWithoutPoolInput[];
    createMany?: Prisma.InvitationCreateManyPoolInputEnvelope;
    connect?: Prisma.InvitationWhereUniqueInput | Prisma.InvitationWhereUniqueInput[];
};
export type InvitationUpdateManyWithoutPoolNestedInput = {
    create?: Prisma.XOR<Prisma.InvitationCreateWithoutPoolInput, Prisma.InvitationUncheckedCreateWithoutPoolInput> | Prisma.InvitationCreateWithoutPoolInput[] | Prisma.InvitationUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.InvitationCreateOrConnectWithoutPoolInput | Prisma.InvitationCreateOrConnectWithoutPoolInput[];
    upsert?: Prisma.InvitationUpsertWithWhereUniqueWithoutPoolInput | Prisma.InvitationUpsertWithWhereUniqueWithoutPoolInput[];
    createMany?: Prisma.InvitationCreateManyPoolInputEnvelope;
    set?: Prisma.InvitationWhereUniqueInput | Prisma.InvitationWhereUniqueInput[];
    disconnect?: Prisma.InvitationWhereUniqueInput | Prisma.InvitationWhereUniqueInput[];
    delete?: Prisma.InvitationWhereUniqueInput | Prisma.InvitationWhereUniqueInput[];
    connect?: Prisma.InvitationWhereUniqueInput | Prisma.InvitationWhereUniqueInput[];
    update?: Prisma.InvitationUpdateWithWhereUniqueWithoutPoolInput | Prisma.InvitationUpdateWithWhereUniqueWithoutPoolInput[];
    updateMany?: Prisma.InvitationUpdateManyWithWhereWithoutPoolInput | Prisma.InvitationUpdateManyWithWhereWithoutPoolInput[];
    deleteMany?: Prisma.InvitationScalarWhereInput | Prisma.InvitationScalarWhereInput[];
};
export type InvitationUncheckedUpdateManyWithoutPoolNestedInput = {
    create?: Prisma.XOR<Prisma.InvitationCreateWithoutPoolInput, Prisma.InvitationUncheckedCreateWithoutPoolInput> | Prisma.InvitationCreateWithoutPoolInput[] | Prisma.InvitationUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.InvitationCreateOrConnectWithoutPoolInput | Prisma.InvitationCreateOrConnectWithoutPoolInput[];
    upsert?: Prisma.InvitationUpsertWithWhereUniqueWithoutPoolInput | Prisma.InvitationUpsertWithWhereUniqueWithoutPoolInput[];
    createMany?: Prisma.InvitationCreateManyPoolInputEnvelope;
    set?: Prisma.InvitationWhereUniqueInput | Prisma.InvitationWhereUniqueInput[];
    disconnect?: Prisma.InvitationWhereUniqueInput | Prisma.InvitationWhereUniqueInput[];
    delete?: Prisma.InvitationWhereUniqueInput | Prisma.InvitationWhereUniqueInput[];
    connect?: Prisma.InvitationWhereUniqueInput | Prisma.InvitationWhereUniqueInput[];
    update?: Prisma.InvitationUpdateWithWhereUniqueWithoutPoolInput | Prisma.InvitationUpdateWithWhereUniqueWithoutPoolInput[];
    updateMany?: Prisma.InvitationUpdateManyWithWhereWithoutPoolInput | Prisma.InvitationUpdateManyWithWhereWithoutPoolInput[];
    deleteMany?: Prisma.InvitationScalarWhereInput | Prisma.InvitationScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type InvitationCreateWithoutPoolInput = {
    code: string;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
};
export type InvitationUncheckedCreateWithoutPoolInput = {
    id?: number;
    code: string;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
};
export type InvitationCreateOrConnectWithoutPoolInput = {
    where: Prisma.InvitationWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvitationCreateWithoutPoolInput, Prisma.InvitationUncheckedCreateWithoutPoolInput>;
};
export type InvitationCreateManyPoolInputEnvelope = {
    data: Prisma.InvitationCreateManyPoolInput | Prisma.InvitationCreateManyPoolInput[];
    skipDuplicates?: boolean;
};
export type InvitationUpsertWithWhereUniqueWithoutPoolInput = {
    where: Prisma.InvitationWhereUniqueInput;
    update: Prisma.XOR<Prisma.InvitationUpdateWithoutPoolInput, Prisma.InvitationUncheckedUpdateWithoutPoolInput>;
    create: Prisma.XOR<Prisma.InvitationCreateWithoutPoolInput, Prisma.InvitationUncheckedCreateWithoutPoolInput>;
};
export type InvitationUpdateWithWhereUniqueWithoutPoolInput = {
    where: Prisma.InvitationWhereUniqueInput;
    data: Prisma.XOR<Prisma.InvitationUpdateWithoutPoolInput, Prisma.InvitationUncheckedUpdateWithoutPoolInput>;
};
export type InvitationUpdateManyWithWhereWithoutPoolInput = {
    where: Prisma.InvitationScalarWhereInput;
    data: Prisma.XOR<Prisma.InvitationUpdateManyMutationInput, Prisma.InvitationUncheckedUpdateManyWithoutPoolInput>;
};
export type InvitationScalarWhereInput = {
    AND?: Prisma.InvitationScalarWhereInput | Prisma.InvitationScalarWhereInput[];
    OR?: Prisma.InvitationScalarWhereInput[];
    NOT?: Prisma.InvitationScalarWhereInput | Prisma.InvitationScalarWhereInput[];
    id?: Prisma.IntFilter<"Invitation"> | number;
    poolId?: Prisma.IntFilter<"Invitation"> | number;
    code?: Prisma.StringFilter<"Invitation"> | string;
    expiresAt?: Prisma.DateTimeNullableFilter<"Invitation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Invitation"> | Date | string;
};
export type InvitationCreateManyPoolInput = {
    id?: number;
    code: string;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
};
export type InvitationUpdateWithoutPoolInput = {
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvitationUncheckedUpdateWithoutPoolInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvitationUncheckedUpdateManyWithoutPoolInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvitationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    poolId?: boolean;
    code?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    pool?: boolean | Prisma.PoolDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["invitation"]>;
export type InvitationSelectScalar = {
    id?: boolean;
    poolId?: boolean;
    code?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
};
export type InvitationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "poolId" | "code" | "expiresAt" | "createdAt", ExtArgs["result"]["invitation"]>;
export type InvitationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pool?: boolean | Prisma.PoolDefaultArgs<ExtArgs>;
};
export type $InvitationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Invitation";
    objects: {
        pool: Prisma.$PoolPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        poolId: number;
        code: string;
        expiresAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["invitation"]>;
    composites: {};
};
export type InvitationGetPayload<S extends boolean | null | undefined | InvitationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InvitationPayload, S>;
export type InvitationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InvitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InvitationCountAggregateInputType | true;
};
export interface InvitationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Invitation'];
        meta: {
            name: 'Invitation';
        };
    };
    findUnique<T extends InvitationFindUniqueArgs>(args: Prisma.SelectSubset<T, InvitationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InvitationClient<runtime.Types.Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InvitationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InvitationClient<runtime.Types.Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InvitationFindFirstArgs>(args?: Prisma.SelectSubset<T, InvitationFindFirstArgs<ExtArgs>>): Prisma.Prisma__InvitationClient<runtime.Types.Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InvitationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InvitationClient<runtime.Types.Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InvitationFindManyArgs>(args?: Prisma.SelectSubset<T, InvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InvitationCreateArgs>(args: Prisma.SelectSubset<T, InvitationCreateArgs<ExtArgs>>): Prisma.Prisma__InvitationClient<runtime.Types.Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InvitationCreateManyArgs>(args?: Prisma.SelectSubset<T, InvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends InvitationDeleteArgs>(args: Prisma.SelectSubset<T, InvitationDeleteArgs<ExtArgs>>): Prisma.Prisma__InvitationClient<runtime.Types.Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InvitationUpdateArgs>(args: Prisma.SelectSubset<T, InvitationUpdateArgs<ExtArgs>>): Prisma.Prisma__InvitationClient<runtime.Types.Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InvitationDeleteManyArgs>(args?: Prisma.SelectSubset<T, InvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InvitationUpdateManyArgs>(args: Prisma.SelectSubset<T, InvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends InvitationUpsertArgs>(args: Prisma.SelectSubset<T, InvitationUpsertArgs<ExtArgs>>): Prisma.Prisma__InvitationClient<runtime.Types.Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InvitationCountArgs>(args?: Prisma.Subset<T, InvitationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InvitationCountAggregateOutputType> : number>;
    aggregate<T extends InvitationAggregateArgs>(args: Prisma.Subset<T, InvitationAggregateArgs>): Prisma.PrismaPromise<GetInvitationAggregateType<T>>;
    groupBy<T extends InvitationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InvitationGroupByArgs['orderBy'];
    } : {
        orderBy?: InvitationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InvitationFieldRefs;
}
export interface Prisma__InvitationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    pool<T extends Prisma.PoolDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PoolDefaultArgs<ExtArgs>>): Prisma.Prisma__PoolClient<runtime.Types.Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InvitationFieldRefs {
    readonly id: Prisma.FieldRef<"Invitation", 'Int'>;
    readonly poolId: Prisma.FieldRef<"Invitation", 'Int'>;
    readonly code: Prisma.FieldRef<"Invitation", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"Invitation", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Invitation", 'DateTime'>;
}
export type InvitationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvitationSelect<ExtArgs> | null;
    omit?: Prisma.InvitationOmit<ExtArgs> | null;
    include?: Prisma.InvitationInclude<ExtArgs> | null;
    where: Prisma.InvitationWhereUniqueInput;
};
export type InvitationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvitationSelect<ExtArgs> | null;
    omit?: Prisma.InvitationOmit<ExtArgs> | null;
    include?: Prisma.InvitationInclude<ExtArgs> | null;
    where: Prisma.InvitationWhereUniqueInput;
};
export type InvitationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InvitationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InvitationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InvitationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvitationSelect<ExtArgs> | null;
    omit?: Prisma.InvitationOmit<ExtArgs> | null;
    include?: Prisma.InvitationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvitationCreateInput, Prisma.InvitationUncheckedCreateInput>;
};
export type InvitationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InvitationCreateManyInput | Prisma.InvitationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InvitationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvitationSelect<ExtArgs> | null;
    omit?: Prisma.InvitationOmit<ExtArgs> | null;
    include?: Prisma.InvitationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvitationUpdateInput, Prisma.InvitationUncheckedUpdateInput>;
    where: Prisma.InvitationWhereUniqueInput;
};
export type InvitationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InvitationUpdateManyMutationInput, Prisma.InvitationUncheckedUpdateManyInput>;
    where?: Prisma.InvitationWhereInput;
    limit?: number;
};
export type InvitationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvitationSelect<ExtArgs> | null;
    omit?: Prisma.InvitationOmit<ExtArgs> | null;
    include?: Prisma.InvitationInclude<ExtArgs> | null;
    where: Prisma.InvitationWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvitationCreateInput, Prisma.InvitationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InvitationUpdateInput, Prisma.InvitationUncheckedUpdateInput>;
};
export type InvitationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvitationSelect<ExtArgs> | null;
    omit?: Prisma.InvitationOmit<ExtArgs> | null;
    include?: Prisma.InvitationInclude<ExtArgs> | null;
    where: Prisma.InvitationWhereUniqueInput;
};
export type InvitationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvitationWhereInput;
    limit?: number;
};
export type InvitationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvitationSelect<ExtArgs> | null;
    omit?: Prisma.InvitationOmit<ExtArgs> | null;
    include?: Prisma.InvitationInclude<ExtArgs> | null;
};
