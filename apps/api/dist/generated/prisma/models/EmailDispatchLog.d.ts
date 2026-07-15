import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type EmailDispatchLogModel = runtime.Types.Result.DefaultSelection<Prisma.$EmailDispatchLogPayload>;
export type AggregateEmailDispatchLog = {
    _count: EmailDispatchLogCountAggregateOutputType | null;
    _avg: EmailDispatchLogAvgAggregateOutputType | null;
    _sum: EmailDispatchLogSumAggregateOutputType | null;
    _min: EmailDispatchLogMinAggregateOutputType | null;
    _max: EmailDispatchLogMaxAggregateOutputType | null;
};
export type EmailDispatchLogAvgAggregateOutputType = {
    id: number | null;
    userId: number | null;
};
export type EmailDispatchLogSumAggregateOutputType = {
    id: number | null;
    userId: number | null;
};
export type EmailDispatchLogMinAggregateOutputType = {
    id: number | null;
    userId: number | null;
    type: $Enums.EmailDispatchType | null;
    dayKey: string | null;
    createdAt: Date | null;
};
export type EmailDispatchLogMaxAggregateOutputType = {
    id: number | null;
    userId: number | null;
    type: $Enums.EmailDispatchType | null;
    dayKey: string | null;
    createdAt: Date | null;
};
export type EmailDispatchLogCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    dayKey: number;
    createdAt: number;
    _all: number;
};
export type EmailDispatchLogAvgAggregateInputType = {
    id?: true;
    userId?: true;
};
export type EmailDispatchLogSumAggregateInputType = {
    id?: true;
    userId?: true;
};
export type EmailDispatchLogMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    dayKey?: true;
    createdAt?: true;
};
export type EmailDispatchLogMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    dayKey?: true;
    createdAt?: true;
};
export type EmailDispatchLogCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    dayKey?: true;
    createdAt?: true;
    _all?: true;
};
export type EmailDispatchLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailDispatchLogWhereInput;
    orderBy?: Prisma.EmailDispatchLogOrderByWithRelationInput | Prisma.EmailDispatchLogOrderByWithRelationInput[];
    cursor?: Prisma.EmailDispatchLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EmailDispatchLogCountAggregateInputType;
    _avg?: EmailDispatchLogAvgAggregateInputType;
    _sum?: EmailDispatchLogSumAggregateInputType;
    _min?: EmailDispatchLogMinAggregateInputType;
    _max?: EmailDispatchLogMaxAggregateInputType;
};
export type GetEmailDispatchLogAggregateType<T extends EmailDispatchLogAggregateArgs> = {
    [P in keyof T & keyof AggregateEmailDispatchLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEmailDispatchLog[P]> : Prisma.GetScalarType<T[P], AggregateEmailDispatchLog[P]>;
};
export type EmailDispatchLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailDispatchLogWhereInput;
    orderBy?: Prisma.EmailDispatchLogOrderByWithAggregationInput | Prisma.EmailDispatchLogOrderByWithAggregationInput[];
    by: Prisma.EmailDispatchLogScalarFieldEnum[] | Prisma.EmailDispatchLogScalarFieldEnum;
    having?: Prisma.EmailDispatchLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EmailDispatchLogCountAggregateInputType | true;
    _avg?: EmailDispatchLogAvgAggregateInputType;
    _sum?: EmailDispatchLogSumAggregateInputType;
    _min?: EmailDispatchLogMinAggregateInputType;
    _max?: EmailDispatchLogMaxAggregateInputType;
};
export type EmailDispatchLogGroupByOutputType = {
    id: number;
    userId: number;
    type: $Enums.EmailDispatchType;
    dayKey: string;
    createdAt: Date;
    _count: EmailDispatchLogCountAggregateOutputType | null;
    _avg: EmailDispatchLogAvgAggregateOutputType | null;
    _sum: EmailDispatchLogSumAggregateOutputType | null;
    _min: EmailDispatchLogMinAggregateOutputType | null;
    _max: EmailDispatchLogMaxAggregateOutputType | null;
};
export type GetEmailDispatchLogGroupByPayload<T extends EmailDispatchLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EmailDispatchLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EmailDispatchLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EmailDispatchLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EmailDispatchLogGroupByOutputType[P]>;
}>>;
export type EmailDispatchLogWhereInput = {
    AND?: Prisma.EmailDispatchLogWhereInput | Prisma.EmailDispatchLogWhereInput[];
    OR?: Prisma.EmailDispatchLogWhereInput[];
    NOT?: Prisma.EmailDispatchLogWhereInput | Prisma.EmailDispatchLogWhereInput[];
    id?: Prisma.IntFilter<"EmailDispatchLog"> | number;
    userId?: Prisma.IntFilter<"EmailDispatchLog"> | number;
    type?: Prisma.EnumEmailDispatchTypeFilter<"EmailDispatchLog"> | $Enums.EmailDispatchType;
    dayKey?: Prisma.StringFilter<"EmailDispatchLog"> | string;
    createdAt?: Prisma.DateTimeFilter<"EmailDispatchLog"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type EmailDispatchLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    dayKey?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    _relevance?: Prisma.EmailDispatchLogOrderByRelevanceInput;
};
export type EmailDispatchLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    userId_type_dayKey?: Prisma.EmailDispatchLogUserIdTypeDayKeyCompoundUniqueInput;
    AND?: Prisma.EmailDispatchLogWhereInput | Prisma.EmailDispatchLogWhereInput[];
    OR?: Prisma.EmailDispatchLogWhereInput[];
    NOT?: Prisma.EmailDispatchLogWhereInput | Prisma.EmailDispatchLogWhereInput[];
    userId?: Prisma.IntFilter<"EmailDispatchLog"> | number;
    type?: Prisma.EnumEmailDispatchTypeFilter<"EmailDispatchLog"> | $Enums.EmailDispatchType;
    dayKey?: Prisma.StringFilter<"EmailDispatchLog"> | string;
    createdAt?: Prisma.DateTimeFilter<"EmailDispatchLog"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId_type_dayKey">;
export type EmailDispatchLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    dayKey?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.EmailDispatchLogCountOrderByAggregateInput;
    _avg?: Prisma.EmailDispatchLogAvgOrderByAggregateInput;
    _max?: Prisma.EmailDispatchLogMaxOrderByAggregateInput;
    _min?: Prisma.EmailDispatchLogMinOrderByAggregateInput;
    _sum?: Prisma.EmailDispatchLogSumOrderByAggregateInput;
};
export type EmailDispatchLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.EmailDispatchLogScalarWhereWithAggregatesInput | Prisma.EmailDispatchLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.EmailDispatchLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EmailDispatchLogScalarWhereWithAggregatesInput | Prisma.EmailDispatchLogScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"EmailDispatchLog"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"EmailDispatchLog"> | number;
    type?: Prisma.EnumEmailDispatchTypeWithAggregatesFilter<"EmailDispatchLog"> | $Enums.EmailDispatchType;
    dayKey?: Prisma.StringWithAggregatesFilter<"EmailDispatchLog"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"EmailDispatchLog"> | Date | string;
};
export type EmailDispatchLogCreateInput = {
    type: $Enums.EmailDispatchType;
    dayKey: string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutEmailDispatchLogsInput;
};
export type EmailDispatchLogUncheckedCreateInput = {
    id?: number;
    userId: number;
    type: $Enums.EmailDispatchType;
    dayKey: string;
    createdAt?: Date | string;
};
export type EmailDispatchLogUpdateInput = {
    type?: Prisma.EnumEmailDispatchTypeFieldUpdateOperationsInput | $Enums.EmailDispatchType;
    dayKey?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutEmailDispatchLogsNestedInput;
};
export type EmailDispatchLogUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumEmailDispatchTypeFieldUpdateOperationsInput | $Enums.EmailDispatchType;
    dayKey?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailDispatchLogCreateManyInput = {
    id?: number;
    userId: number;
    type: $Enums.EmailDispatchType;
    dayKey: string;
    createdAt?: Date | string;
};
export type EmailDispatchLogUpdateManyMutationInput = {
    type?: Prisma.EnumEmailDispatchTypeFieldUpdateOperationsInput | $Enums.EmailDispatchType;
    dayKey?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailDispatchLogUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumEmailDispatchTypeFieldUpdateOperationsInput | $Enums.EmailDispatchType;
    dayKey?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailDispatchLogListRelationFilter = {
    every?: Prisma.EmailDispatchLogWhereInput;
    some?: Prisma.EmailDispatchLogWhereInput;
    none?: Prisma.EmailDispatchLogWhereInput;
};
export type EmailDispatchLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EmailDispatchLogOrderByRelevanceInput = {
    fields: Prisma.EmailDispatchLogOrderByRelevanceFieldEnum | Prisma.EmailDispatchLogOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type EmailDispatchLogUserIdTypeDayKeyCompoundUniqueInput = {
    userId: number;
    type: $Enums.EmailDispatchType;
    dayKey: string;
};
export type EmailDispatchLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    dayKey?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EmailDispatchLogAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type EmailDispatchLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    dayKey?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EmailDispatchLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    dayKey?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EmailDispatchLogSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type EmailDispatchLogCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.EmailDispatchLogCreateWithoutUserInput, Prisma.EmailDispatchLogUncheckedCreateWithoutUserInput> | Prisma.EmailDispatchLogCreateWithoutUserInput[] | Prisma.EmailDispatchLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EmailDispatchLogCreateOrConnectWithoutUserInput | Prisma.EmailDispatchLogCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.EmailDispatchLogCreateManyUserInputEnvelope;
    connect?: Prisma.EmailDispatchLogWhereUniqueInput | Prisma.EmailDispatchLogWhereUniqueInput[];
};
export type EmailDispatchLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.EmailDispatchLogCreateWithoutUserInput, Prisma.EmailDispatchLogUncheckedCreateWithoutUserInput> | Prisma.EmailDispatchLogCreateWithoutUserInput[] | Prisma.EmailDispatchLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EmailDispatchLogCreateOrConnectWithoutUserInput | Prisma.EmailDispatchLogCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.EmailDispatchLogCreateManyUserInputEnvelope;
    connect?: Prisma.EmailDispatchLogWhereUniqueInput | Prisma.EmailDispatchLogWhereUniqueInput[];
};
export type EmailDispatchLogUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.EmailDispatchLogCreateWithoutUserInput, Prisma.EmailDispatchLogUncheckedCreateWithoutUserInput> | Prisma.EmailDispatchLogCreateWithoutUserInput[] | Prisma.EmailDispatchLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EmailDispatchLogCreateOrConnectWithoutUserInput | Prisma.EmailDispatchLogCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.EmailDispatchLogUpsertWithWhereUniqueWithoutUserInput | Prisma.EmailDispatchLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.EmailDispatchLogCreateManyUserInputEnvelope;
    set?: Prisma.EmailDispatchLogWhereUniqueInput | Prisma.EmailDispatchLogWhereUniqueInput[];
    disconnect?: Prisma.EmailDispatchLogWhereUniqueInput | Prisma.EmailDispatchLogWhereUniqueInput[];
    delete?: Prisma.EmailDispatchLogWhereUniqueInput | Prisma.EmailDispatchLogWhereUniqueInput[];
    connect?: Prisma.EmailDispatchLogWhereUniqueInput | Prisma.EmailDispatchLogWhereUniqueInput[];
    update?: Prisma.EmailDispatchLogUpdateWithWhereUniqueWithoutUserInput | Prisma.EmailDispatchLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.EmailDispatchLogUpdateManyWithWhereWithoutUserInput | Prisma.EmailDispatchLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.EmailDispatchLogScalarWhereInput | Prisma.EmailDispatchLogScalarWhereInput[];
};
export type EmailDispatchLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.EmailDispatchLogCreateWithoutUserInput, Prisma.EmailDispatchLogUncheckedCreateWithoutUserInput> | Prisma.EmailDispatchLogCreateWithoutUserInput[] | Prisma.EmailDispatchLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EmailDispatchLogCreateOrConnectWithoutUserInput | Prisma.EmailDispatchLogCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.EmailDispatchLogUpsertWithWhereUniqueWithoutUserInput | Prisma.EmailDispatchLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.EmailDispatchLogCreateManyUserInputEnvelope;
    set?: Prisma.EmailDispatchLogWhereUniqueInput | Prisma.EmailDispatchLogWhereUniqueInput[];
    disconnect?: Prisma.EmailDispatchLogWhereUniqueInput | Prisma.EmailDispatchLogWhereUniqueInput[];
    delete?: Prisma.EmailDispatchLogWhereUniqueInput | Prisma.EmailDispatchLogWhereUniqueInput[];
    connect?: Prisma.EmailDispatchLogWhereUniqueInput | Prisma.EmailDispatchLogWhereUniqueInput[];
    update?: Prisma.EmailDispatchLogUpdateWithWhereUniqueWithoutUserInput | Prisma.EmailDispatchLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.EmailDispatchLogUpdateManyWithWhereWithoutUserInput | Prisma.EmailDispatchLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.EmailDispatchLogScalarWhereInput | Prisma.EmailDispatchLogScalarWhereInput[];
};
export type EnumEmailDispatchTypeFieldUpdateOperationsInput = {
    set?: $Enums.EmailDispatchType;
};
export type EmailDispatchLogCreateWithoutUserInput = {
    type: $Enums.EmailDispatchType;
    dayKey: string;
    createdAt?: Date | string;
};
export type EmailDispatchLogUncheckedCreateWithoutUserInput = {
    id?: number;
    type: $Enums.EmailDispatchType;
    dayKey: string;
    createdAt?: Date | string;
};
export type EmailDispatchLogCreateOrConnectWithoutUserInput = {
    where: Prisma.EmailDispatchLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmailDispatchLogCreateWithoutUserInput, Prisma.EmailDispatchLogUncheckedCreateWithoutUserInput>;
};
export type EmailDispatchLogCreateManyUserInputEnvelope = {
    data: Prisma.EmailDispatchLogCreateManyUserInput | Prisma.EmailDispatchLogCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type EmailDispatchLogUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.EmailDispatchLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.EmailDispatchLogUpdateWithoutUserInput, Prisma.EmailDispatchLogUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.EmailDispatchLogCreateWithoutUserInput, Prisma.EmailDispatchLogUncheckedCreateWithoutUserInput>;
};
export type EmailDispatchLogUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.EmailDispatchLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.EmailDispatchLogUpdateWithoutUserInput, Prisma.EmailDispatchLogUncheckedUpdateWithoutUserInput>;
};
export type EmailDispatchLogUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.EmailDispatchLogScalarWhereInput;
    data: Prisma.XOR<Prisma.EmailDispatchLogUpdateManyMutationInput, Prisma.EmailDispatchLogUncheckedUpdateManyWithoutUserInput>;
};
export type EmailDispatchLogScalarWhereInput = {
    AND?: Prisma.EmailDispatchLogScalarWhereInput | Prisma.EmailDispatchLogScalarWhereInput[];
    OR?: Prisma.EmailDispatchLogScalarWhereInput[];
    NOT?: Prisma.EmailDispatchLogScalarWhereInput | Prisma.EmailDispatchLogScalarWhereInput[];
    id?: Prisma.IntFilter<"EmailDispatchLog"> | number;
    userId?: Prisma.IntFilter<"EmailDispatchLog"> | number;
    type?: Prisma.EnumEmailDispatchTypeFilter<"EmailDispatchLog"> | $Enums.EmailDispatchType;
    dayKey?: Prisma.StringFilter<"EmailDispatchLog"> | string;
    createdAt?: Prisma.DateTimeFilter<"EmailDispatchLog"> | Date | string;
};
export type EmailDispatchLogCreateManyUserInput = {
    id?: number;
    type: $Enums.EmailDispatchType;
    dayKey: string;
    createdAt?: Date | string;
};
export type EmailDispatchLogUpdateWithoutUserInput = {
    type?: Prisma.EnumEmailDispatchTypeFieldUpdateOperationsInput | $Enums.EmailDispatchType;
    dayKey?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailDispatchLogUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumEmailDispatchTypeFieldUpdateOperationsInput | $Enums.EmailDispatchType;
    dayKey?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailDispatchLogUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumEmailDispatchTypeFieldUpdateOperationsInput | $Enums.EmailDispatchType;
    dayKey?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailDispatchLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    dayKey?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["emailDispatchLog"]>;
export type EmailDispatchLogSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    dayKey?: boolean;
    createdAt?: boolean;
};
export type EmailDispatchLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "type" | "dayKey" | "createdAt", ExtArgs["result"]["emailDispatchLog"]>;
export type EmailDispatchLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $EmailDispatchLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "EmailDispatchLog";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        userId: number;
        type: $Enums.EmailDispatchType;
        dayKey: string;
        createdAt: Date;
    }, ExtArgs["result"]["emailDispatchLog"]>;
    composites: {};
};
export type EmailDispatchLogGetPayload<S extends boolean | null | undefined | EmailDispatchLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EmailDispatchLogPayload, S>;
export type EmailDispatchLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EmailDispatchLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EmailDispatchLogCountAggregateInputType | true;
};
export interface EmailDispatchLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['EmailDispatchLog'];
        meta: {
            name: 'EmailDispatchLog';
        };
    };
    findUnique<T extends EmailDispatchLogFindUniqueArgs>(args: Prisma.SelectSubset<T, EmailDispatchLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EmailDispatchLogClient<runtime.Types.Result.GetResult<Prisma.$EmailDispatchLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EmailDispatchLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EmailDispatchLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmailDispatchLogClient<runtime.Types.Result.GetResult<Prisma.$EmailDispatchLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EmailDispatchLogFindFirstArgs>(args?: Prisma.SelectSubset<T, EmailDispatchLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__EmailDispatchLogClient<runtime.Types.Result.GetResult<Prisma.$EmailDispatchLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EmailDispatchLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EmailDispatchLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmailDispatchLogClient<runtime.Types.Result.GetResult<Prisma.$EmailDispatchLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EmailDispatchLogFindManyArgs>(args?: Prisma.SelectSubset<T, EmailDispatchLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailDispatchLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EmailDispatchLogCreateArgs>(args: Prisma.SelectSubset<T, EmailDispatchLogCreateArgs<ExtArgs>>): Prisma.Prisma__EmailDispatchLogClient<runtime.Types.Result.GetResult<Prisma.$EmailDispatchLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EmailDispatchLogCreateManyArgs>(args?: Prisma.SelectSubset<T, EmailDispatchLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends EmailDispatchLogDeleteArgs>(args: Prisma.SelectSubset<T, EmailDispatchLogDeleteArgs<ExtArgs>>): Prisma.Prisma__EmailDispatchLogClient<runtime.Types.Result.GetResult<Prisma.$EmailDispatchLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EmailDispatchLogUpdateArgs>(args: Prisma.SelectSubset<T, EmailDispatchLogUpdateArgs<ExtArgs>>): Prisma.Prisma__EmailDispatchLogClient<runtime.Types.Result.GetResult<Prisma.$EmailDispatchLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EmailDispatchLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, EmailDispatchLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EmailDispatchLogUpdateManyArgs>(args: Prisma.SelectSubset<T, EmailDispatchLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends EmailDispatchLogUpsertArgs>(args: Prisma.SelectSubset<T, EmailDispatchLogUpsertArgs<ExtArgs>>): Prisma.Prisma__EmailDispatchLogClient<runtime.Types.Result.GetResult<Prisma.$EmailDispatchLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EmailDispatchLogCountArgs>(args?: Prisma.Subset<T, EmailDispatchLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EmailDispatchLogCountAggregateOutputType> : number>;
    aggregate<T extends EmailDispatchLogAggregateArgs>(args: Prisma.Subset<T, EmailDispatchLogAggregateArgs>): Prisma.PrismaPromise<GetEmailDispatchLogAggregateType<T>>;
    groupBy<T extends EmailDispatchLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EmailDispatchLogGroupByArgs['orderBy'];
    } : {
        orderBy?: EmailDispatchLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EmailDispatchLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailDispatchLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EmailDispatchLogFieldRefs;
}
export interface Prisma__EmailDispatchLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EmailDispatchLogFieldRefs {
    readonly id: Prisma.FieldRef<"EmailDispatchLog", 'Int'>;
    readonly userId: Prisma.FieldRef<"EmailDispatchLog", 'Int'>;
    readonly type: Prisma.FieldRef<"EmailDispatchLog", 'EmailDispatchType'>;
    readonly dayKey: Prisma.FieldRef<"EmailDispatchLog", 'String'>;
    readonly createdAt: Prisma.FieldRef<"EmailDispatchLog", 'DateTime'>;
}
export type EmailDispatchLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailDispatchLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailDispatchLogOmit<ExtArgs> | null;
    include?: Prisma.EmailDispatchLogInclude<ExtArgs> | null;
    where: Prisma.EmailDispatchLogWhereUniqueInput;
};
export type EmailDispatchLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailDispatchLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailDispatchLogOmit<ExtArgs> | null;
    include?: Prisma.EmailDispatchLogInclude<ExtArgs> | null;
    where: Prisma.EmailDispatchLogWhereUniqueInput;
};
export type EmailDispatchLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type EmailDispatchLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type EmailDispatchLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type EmailDispatchLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailDispatchLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailDispatchLogOmit<ExtArgs> | null;
    include?: Prisma.EmailDispatchLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmailDispatchLogCreateInput, Prisma.EmailDispatchLogUncheckedCreateInput>;
};
export type EmailDispatchLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EmailDispatchLogCreateManyInput | Prisma.EmailDispatchLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EmailDispatchLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailDispatchLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailDispatchLogOmit<ExtArgs> | null;
    include?: Prisma.EmailDispatchLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmailDispatchLogUpdateInput, Prisma.EmailDispatchLogUncheckedUpdateInput>;
    where: Prisma.EmailDispatchLogWhereUniqueInput;
};
export type EmailDispatchLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EmailDispatchLogUpdateManyMutationInput, Prisma.EmailDispatchLogUncheckedUpdateManyInput>;
    where?: Prisma.EmailDispatchLogWhereInput;
    limit?: number;
};
export type EmailDispatchLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailDispatchLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailDispatchLogOmit<ExtArgs> | null;
    include?: Prisma.EmailDispatchLogInclude<ExtArgs> | null;
    where: Prisma.EmailDispatchLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmailDispatchLogCreateInput, Prisma.EmailDispatchLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EmailDispatchLogUpdateInput, Prisma.EmailDispatchLogUncheckedUpdateInput>;
};
export type EmailDispatchLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailDispatchLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailDispatchLogOmit<ExtArgs> | null;
    include?: Prisma.EmailDispatchLogInclude<ExtArgs> | null;
    where: Prisma.EmailDispatchLogWhereUniqueInput;
};
export type EmailDispatchLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailDispatchLogWhereInput;
    limit?: number;
};
export type EmailDispatchLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailDispatchLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailDispatchLogOmit<ExtArgs> | null;
    include?: Prisma.EmailDispatchLogInclude<ExtArgs> | null;
};
