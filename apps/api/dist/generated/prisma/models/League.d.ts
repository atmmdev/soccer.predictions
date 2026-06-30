import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type LeagueModel = runtime.Types.Result.DefaultSelection<Prisma.$LeaguePayload>;
export type AggregateLeague = {
    _count: LeagueCountAggregateOutputType | null;
    _avg: LeagueAvgAggregateOutputType | null;
    _sum: LeagueSumAggregateOutputType | null;
    _min: LeagueMinAggregateOutputType | null;
    _max: LeagueMaxAggregateOutputType | null;
};
export type LeagueAvgAggregateOutputType = {
    id: number | null;
    externalId: number | null;
};
export type LeagueSumAggregateOutputType = {
    id: number | null;
    externalId: number | null;
};
export type LeagueMinAggregateOutputType = {
    id: number | null;
    externalId: number | null;
    name: string | null;
    country: string | null;
    type: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LeagueMaxAggregateOutputType = {
    id: number | null;
    externalId: number | null;
    name: string | null;
    country: string | null;
    type: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LeagueCountAggregateOutputType = {
    id: number;
    externalId: number;
    name: number;
    country: number;
    type: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type LeagueAvgAggregateInputType = {
    id?: true;
    externalId?: true;
};
export type LeagueSumAggregateInputType = {
    id?: true;
    externalId?: true;
};
export type LeagueMinAggregateInputType = {
    id?: true;
    externalId?: true;
    name?: true;
    country?: true;
    type?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LeagueMaxAggregateInputType = {
    id?: true;
    externalId?: true;
    name?: true;
    country?: true;
    type?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LeagueCountAggregateInputType = {
    id?: true;
    externalId?: true;
    name?: true;
    country?: true;
    type?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type LeagueAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LeagueWhereInput;
    orderBy?: Prisma.LeagueOrderByWithRelationInput | Prisma.LeagueOrderByWithRelationInput[];
    cursor?: Prisma.LeagueWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LeagueCountAggregateInputType;
    _avg?: LeagueAvgAggregateInputType;
    _sum?: LeagueSumAggregateInputType;
    _min?: LeagueMinAggregateInputType;
    _max?: LeagueMaxAggregateInputType;
};
export type GetLeagueAggregateType<T extends LeagueAggregateArgs> = {
    [P in keyof T & keyof AggregateLeague]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLeague[P]> : Prisma.GetScalarType<T[P], AggregateLeague[P]>;
};
export type LeagueGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LeagueWhereInput;
    orderBy?: Prisma.LeagueOrderByWithAggregationInput | Prisma.LeagueOrderByWithAggregationInput[];
    by: Prisma.LeagueScalarFieldEnum[] | Prisma.LeagueScalarFieldEnum;
    having?: Prisma.LeagueScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LeagueCountAggregateInputType | true;
    _avg?: LeagueAvgAggregateInputType;
    _sum?: LeagueSumAggregateInputType;
    _min?: LeagueMinAggregateInputType;
    _max?: LeagueMaxAggregateInputType;
};
export type LeagueGroupByOutputType = {
    id: number;
    externalId: number;
    name: string;
    country: string;
    type: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: LeagueCountAggregateOutputType | null;
    _avg: LeagueAvgAggregateOutputType | null;
    _sum: LeagueSumAggregateOutputType | null;
    _min: LeagueMinAggregateOutputType | null;
    _max: LeagueMaxAggregateOutputType | null;
};
export type GetLeagueGroupByPayload<T extends LeagueGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LeagueGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LeagueGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LeagueGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LeagueGroupByOutputType[P]>;
}>>;
export type LeagueWhereInput = {
    AND?: Prisma.LeagueWhereInput | Prisma.LeagueWhereInput[];
    OR?: Prisma.LeagueWhereInput[];
    NOT?: Prisma.LeagueWhereInput | Prisma.LeagueWhereInput[];
    id?: Prisma.IntFilter<"League"> | number;
    externalId?: Prisma.IntFilter<"League"> | number;
    name?: Prisma.StringFilter<"League"> | string;
    country?: Prisma.StringFilter<"League"> | string;
    type?: Prisma.StringNullableFilter<"League"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"League"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"League"> | Date | string;
    championships?: Prisma.ChampionshipListRelationFilter;
};
export type LeagueOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    type?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    championships?: Prisma.ChampionshipOrderByRelationAggregateInput;
    _relevance?: Prisma.LeagueOrderByRelevanceInput;
};
export type LeagueWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    externalId?: number;
    AND?: Prisma.LeagueWhereInput | Prisma.LeagueWhereInput[];
    OR?: Prisma.LeagueWhereInput[];
    NOT?: Prisma.LeagueWhereInput | Prisma.LeagueWhereInput[];
    name?: Prisma.StringFilter<"League"> | string;
    country?: Prisma.StringFilter<"League"> | string;
    type?: Prisma.StringNullableFilter<"League"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"League"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"League"> | Date | string;
    championships?: Prisma.ChampionshipListRelationFilter;
}, "id" | "externalId">;
export type LeagueOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    type?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.LeagueCountOrderByAggregateInput;
    _avg?: Prisma.LeagueAvgOrderByAggregateInput;
    _max?: Prisma.LeagueMaxOrderByAggregateInput;
    _min?: Prisma.LeagueMinOrderByAggregateInput;
    _sum?: Prisma.LeagueSumOrderByAggregateInput;
};
export type LeagueScalarWhereWithAggregatesInput = {
    AND?: Prisma.LeagueScalarWhereWithAggregatesInput | Prisma.LeagueScalarWhereWithAggregatesInput[];
    OR?: Prisma.LeagueScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LeagueScalarWhereWithAggregatesInput | Prisma.LeagueScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"League"> | number;
    externalId?: Prisma.IntWithAggregatesFilter<"League"> | number;
    name?: Prisma.StringWithAggregatesFilter<"League"> | string;
    country?: Prisma.StringWithAggregatesFilter<"League"> | string;
    type?: Prisma.StringNullableWithAggregatesFilter<"League"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"League"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"League"> | Date | string;
};
export type LeagueCreateInput = {
    externalId: number;
    name: string;
    country: string;
    type?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    championships?: Prisma.ChampionshipCreateNestedManyWithoutLeagueInput;
};
export type LeagueUncheckedCreateInput = {
    id?: number;
    externalId: number;
    name: string;
    country: string;
    type?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    championships?: Prisma.ChampionshipUncheckedCreateNestedManyWithoutLeagueInput;
};
export type LeagueUpdateInput = {
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    championships?: Prisma.ChampionshipUpdateManyWithoutLeagueNestedInput;
};
export type LeagueUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    championships?: Prisma.ChampionshipUncheckedUpdateManyWithoutLeagueNestedInput;
};
export type LeagueCreateManyInput = {
    id?: number;
    externalId: number;
    name: string;
    country: string;
    type?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LeagueUpdateManyMutationInput = {
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LeagueUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LeagueOrderByRelevanceInput = {
    fields: Prisma.LeagueOrderByRelevanceFieldEnum | Prisma.LeagueOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type LeagueCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LeagueAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
};
export type LeagueMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LeagueMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LeagueSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
};
export type LeagueScalarRelationFilter = {
    is?: Prisma.LeagueWhereInput;
    isNot?: Prisma.LeagueWhereInput;
};
export type LeagueCreateNestedOneWithoutChampionshipsInput = {
    create?: Prisma.XOR<Prisma.LeagueCreateWithoutChampionshipsInput, Prisma.LeagueUncheckedCreateWithoutChampionshipsInput>;
    connectOrCreate?: Prisma.LeagueCreateOrConnectWithoutChampionshipsInput;
    connect?: Prisma.LeagueWhereUniqueInput;
};
export type LeagueUpdateOneRequiredWithoutChampionshipsNestedInput = {
    create?: Prisma.XOR<Prisma.LeagueCreateWithoutChampionshipsInput, Prisma.LeagueUncheckedCreateWithoutChampionshipsInput>;
    connectOrCreate?: Prisma.LeagueCreateOrConnectWithoutChampionshipsInput;
    upsert?: Prisma.LeagueUpsertWithoutChampionshipsInput;
    connect?: Prisma.LeagueWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LeagueUpdateToOneWithWhereWithoutChampionshipsInput, Prisma.LeagueUpdateWithoutChampionshipsInput>, Prisma.LeagueUncheckedUpdateWithoutChampionshipsInput>;
};
export type LeagueCreateWithoutChampionshipsInput = {
    externalId: number;
    name: string;
    country: string;
    type?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LeagueUncheckedCreateWithoutChampionshipsInput = {
    id?: number;
    externalId: number;
    name: string;
    country: string;
    type?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LeagueCreateOrConnectWithoutChampionshipsInput = {
    where: Prisma.LeagueWhereUniqueInput;
    create: Prisma.XOR<Prisma.LeagueCreateWithoutChampionshipsInput, Prisma.LeagueUncheckedCreateWithoutChampionshipsInput>;
};
export type LeagueUpsertWithoutChampionshipsInput = {
    update: Prisma.XOR<Prisma.LeagueUpdateWithoutChampionshipsInput, Prisma.LeagueUncheckedUpdateWithoutChampionshipsInput>;
    create: Prisma.XOR<Prisma.LeagueCreateWithoutChampionshipsInput, Prisma.LeagueUncheckedCreateWithoutChampionshipsInput>;
    where?: Prisma.LeagueWhereInput;
};
export type LeagueUpdateToOneWithWhereWithoutChampionshipsInput = {
    where?: Prisma.LeagueWhereInput;
    data: Prisma.XOR<Prisma.LeagueUpdateWithoutChampionshipsInput, Prisma.LeagueUncheckedUpdateWithoutChampionshipsInput>;
};
export type LeagueUpdateWithoutChampionshipsInput = {
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LeagueUncheckedUpdateWithoutChampionshipsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LeagueCountOutputType = {
    championships: number;
};
export type LeagueCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    championships?: boolean | LeagueCountOutputTypeCountChampionshipsArgs;
};
export type LeagueCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LeagueCountOutputTypeSelect<ExtArgs> | null;
};
export type LeagueCountOutputTypeCountChampionshipsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChampionshipWhereInput;
};
export type LeagueSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    externalId?: boolean;
    name?: boolean;
    country?: boolean;
    type?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    championships?: boolean | Prisma.League$championshipsArgs<ExtArgs>;
    _count?: boolean | Prisma.LeagueCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["league"]>;
export type LeagueSelectScalar = {
    id?: boolean;
    externalId?: boolean;
    name?: boolean;
    country?: boolean;
    type?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type LeagueOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "externalId" | "name" | "country" | "type" | "createdAt" | "updatedAt", ExtArgs["result"]["league"]>;
export type LeagueInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    championships?: boolean | Prisma.League$championshipsArgs<ExtArgs>;
    _count?: boolean | Prisma.LeagueCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $LeaguePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "League";
    objects: {
        championships: Prisma.$ChampionshipPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        externalId: number;
        name: string;
        country: string;
        type: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["league"]>;
    composites: {};
};
export type LeagueGetPayload<S extends boolean | null | undefined | LeagueDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LeaguePayload, S>;
export type LeagueCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LeagueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LeagueCountAggregateInputType | true;
};
export interface LeagueDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['League'];
        meta: {
            name: 'League';
        };
    };
    findUnique<T extends LeagueFindUniqueArgs>(args: Prisma.SelectSubset<T, LeagueFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LeagueClient<runtime.Types.Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LeagueFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LeagueFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LeagueClient<runtime.Types.Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LeagueFindFirstArgs>(args?: Prisma.SelectSubset<T, LeagueFindFirstArgs<ExtArgs>>): Prisma.Prisma__LeagueClient<runtime.Types.Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LeagueFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LeagueFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LeagueClient<runtime.Types.Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LeagueFindManyArgs>(args?: Prisma.SelectSubset<T, LeagueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LeagueCreateArgs>(args: Prisma.SelectSubset<T, LeagueCreateArgs<ExtArgs>>): Prisma.Prisma__LeagueClient<runtime.Types.Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LeagueCreateManyArgs>(args?: Prisma.SelectSubset<T, LeagueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends LeagueDeleteArgs>(args: Prisma.SelectSubset<T, LeagueDeleteArgs<ExtArgs>>): Prisma.Prisma__LeagueClient<runtime.Types.Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LeagueUpdateArgs>(args: Prisma.SelectSubset<T, LeagueUpdateArgs<ExtArgs>>): Prisma.Prisma__LeagueClient<runtime.Types.Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LeagueDeleteManyArgs>(args?: Prisma.SelectSubset<T, LeagueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LeagueUpdateManyArgs>(args: Prisma.SelectSubset<T, LeagueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends LeagueUpsertArgs>(args: Prisma.SelectSubset<T, LeagueUpsertArgs<ExtArgs>>): Prisma.Prisma__LeagueClient<runtime.Types.Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LeagueCountArgs>(args?: Prisma.Subset<T, LeagueCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LeagueCountAggregateOutputType> : number>;
    aggregate<T extends LeagueAggregateArgs>(args: Prisma.Subset<T, LeagueAggregateArgs>): Prisma.PrismaPromise<GetLeagueAggregateType<T>>;
    groupBy<T extends LeagueGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LeagueGroupByArgs['orderBy'];
    } : {
        orderBy?: LeagueGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LeagueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeagueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LeagueFieldRefs;
}
export interface Prisma__LeagueClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    championships<T extends Prisma.League$championshipsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.League$championshipsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChampionshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LeagueFieldRefs {
    readonly id: Prisma.FieldRef<"League", 'Int'>;
    readonly externalId: Prisma.FieldRef<"League", 'Int'>;
    readonly name: Prisma.FieldRef<"League", 'String'>;
    readonly country: Prisma.FieldRef<"League", 'String'>;
    readonly type: Prisma.FieldRef<"League", 'String'>;
    readonly createdAt: Prisma.FieldRef<"League", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"League", 'DateTime'>;
}
export type LeagueFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LeagueSelect<ExtArgs> | null;
    omit?: Prisma.LeagueOmit<ExtArgs> | null;
    include?: Prisma.LeagueInclude<ExtArgs> | null;
    where: Prisma.LeagueWhereUniqueInput;
};
export type LeagueFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LeagueSelect<ExtArgs> | null;
    omit?: Prisma.LeagueOmit<ExtArgs> | null;
    include?: Prisma.LeagueInclude<ExtArgs> | null;
    where: Prisma.LeagueWhereUniqueInput;
};
export type LeagueFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LeagueSelect<ExtArgs> | null;
    omit?: Prisma.LeagueOmit<ExtArgs> | null;
    include?: Prisma.LeagueInclude<ExtArgs> | null;
    where?: Prisma.LeagueWhereInput;
    orderBy?: Prisma.LeagueOrderByWithRelationInput | Prisma.LeagueOrderByWithRelationInput[];
    cursor?: Prisma.LeagueWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LeagueScalarFieldEnum | Prisma.LeagueScalarFieldEnum[];
};
export type LeagueFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LeagueSelect<ExtArgs> | null;
    omit?: Prisma.LeagueOmit<ExtArgs> | null;
    include?: Prisma.LeagueInclude<ExtArgs> | null;
    where?: Prisma.LeagueWhereInput;
    orderBy?: Prisma.LeagueOrderByWithRelationInput | Prisma.LeagueOrderByWithRelationInput[];
    cursor?: Prisma.LeagueWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LeagueScalarFieldEnum | Prisma.LeagueScalarFieldEnum[];
};
export type LeagueFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LeagueSelect<ExtArgs> | null;
    omit?: Prisma.LeagueOmit<ExtArgs> | null;
    include?: Prisma.LeagueInclude<ExtArgs> | null;
    where?: Prisma.LeagueWhereInput;
    orderBy?: Prisma.LeagueOrderByWithRelationInput | Prisma.LeagueOrderByWithRelationInput[];
    cursor?: Prisma.LeagueWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LeagueScalarFieldEnum | Prisma.LeagueScalarFieldEnum[];
};
export type LeagueCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LeagueSelect<ExtArgs> | null;
    omit?: Prisma.LeagueOmit<ExtArgs> | null;
    include?: Prisma.LeagueInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LeagueCreateInput, Prisma.LeagueUncheckedCreateInput>;
};
export type LeagueCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LeagueCreateManyInput | Prisma.LeagueCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LeagueUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LeagueSelect<ExtArgs> | null;
    omit?: Prisma.LeagueOmit<ExtArgs> | null;
    include?: Prisma.LeagueInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LeagueUpdateInput, Prisma.LeagueUncheckedUpdateInput>;
    where: Prisma.LeagueWhereUniqueInput;
};
export type LeagueUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LeagueUpdateManyMutationInput, Prisma.LeagueUncheckedUpdateManyInput>;
    where?: Prisma.LeagueWhereInput;
    limit?: number;
};
export type LeagueUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LeagueSelect<ExtArgs> | null;
    omit?: Prisma.LeagueOmit<ExtArgs> | null;
    include?: Prisma.LeagueInclude<ExtArgs> | null;
    where: Prisma.LeagueWhereUniqueInput;
    create: Prisma.XOR<Prisma.LeagueCreateInput, Prisma.LeagueUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LeagueUpdateInput, Prisma.LeagueUncheckedUpdateInput>;
};
export type LeagueDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LeagueSelect<ExtArgs> | null;
    omit?: Prisma.LeagueOmit<ExtArgs> | null;
    include?: Prisma.LeagueInclude<ExtArgs> | null;
    where: Prisma.LeagueWhereUniqueInput;
};
export type LeagueDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LeagueWhereInput;
    limit?: number;
};
export type League$championshipsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChampionshipSelect<ExtArgs> | null;
    omit?: Prisma.ChampionshipOmit<ExtArgs> | null;
    include?: Prisma.ChampionshipInclude<ExtArgs> | null;
    where?: Prisma.ChampionshipWhereInput;
    orderBy?: Prisma.ChampionshipOrderByWithRelationInput | Prisma.ChampionshipOrderByWithRelationInput[];
    cursor?: Prisma.ChampionshipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChampionshipScalarFieldEnum | Prisma.ChampionshipScalarFieldEnum[];
};
export type LeagueDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LeagueSelect<ExtArgs> | null;
    omit?: Prisma.LeagueOmit<ExtArgs> | null;
    include?: Prisma.LeagueInclude<ExtArgs> | null;
};
