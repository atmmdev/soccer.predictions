import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ChampionshipModel = runtime.Types.Result.DefaultSelection<Prisma.$ChampionshipPayload>;
export type AggregateChampionship = {
    _count: ChampionshipCountAggregateOutputType | null;
    _avg: ChampionshipAvgAggregateOutputType | null;
    _sum: ChampionshipSumAggregateOutputType | null;
    _min: ChampionshipMinAggregateOutputType | null;
    _max: ChampionshipMaxAggregateOutputType | null;
};
export type ChampionshipAvgAggregateOutputType = {
    id: number | null;
    leagueId: number | null;
    season: number | null;
};
export type ChampionshipSumAggregateOutputType = {
    id: number | null;
    leagueId: number | null;
    season: number | null;
};
export type ChampionshipMinAggregateOutputType = {
    id: number | null;
    leagueId: number | null;
    season: number | null;
    name: string | null;
    country: string | null;
    flags: string | null;
    type: $Enums.ChampionshipType | null;
    status: $Enums.ChampionshipStatus | null;
    isCurrentSeason: boolean | null;
    allowNewPools: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ChampionshipMaxAggregateOutputType = {
    id: number | null;
    leagueId: number | null;
    season: number | null;
    name: string | null;
    country: string | null;
    flags: string | null;
    type: $Enums.ChampionshipType | null;
    status: $Enums.ChampionshipStatus | null;
    isCurrentSeason: boolean | null;
    allowNewPools: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ChampionshipCountAggregateOutputType = {
    id: number;
    leagueId: number;
    season: number;
    name: number;
    country: number;
    flags: number;
    type: number;
    status: number;
    isCurrentSeason: number;
    allowNewPools: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ChampionshipAvgAggregateInputType = {
    id?: true;
    leagueId?: true;
    season?: true;
};
export type ChampionshipSumAggregateInputType = {
    id?: true;
    leagueId?: true;
    season?: true;
};
export type ChampionshipMinAggregateInputType = {
    id?: true;
    leagueId?: true;
    season?: true;
    name?: true;
    country?: true;
    flags?: true;
    type?: true;
    status?: true;
    isCurrentSeason?: true;
    allowNewPools?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ChampionshipMaxAggregateInputType = {
    id?: true;
    leagueId?: true;
    season?: true;
    name?: true;
    country?: true;
    flags?: true;
    type?: true;
    status?: true;
    isCurrentSeason?: true;
    allowNewPools?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ChampionshipCountAggregateInputType = {
    id?: true;
    leagueId?: true;
    season?: true;
    name?: true;
    country?: true;
    flags?: true;
    type?: true;
    status?: true;
    isCurrentSeason?: true;
    allowNewPools?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ChampionshipAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChampionshipWhereInput;
    orderBy?: Prisma.ChampionshipOrderByWithRelationInput | Prisma.ChampionshipOrderByWithRelationInput[];
    cursor?: Prisma.ChampionshipWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ChampionshipCountAggregateInputType;
    _avg?: ChampionshipAvgAggregateInputType;
    _sum?: ChampionshipSumAggregateInputType;
    _min?: ChampionshipMinAggregateInputType;
    _max?: ChampionshipMaxAggregateInputType;
};
export type GetChampionshipAggregateType<T extends ChampionshipAggregateArgs> = {
    [P in keyof T & keyof AggregateChampionship]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateChampionship[P]> : Prisma.GetScalarType<T[P], AggregateChampionship[P]>;
};
export type ChampionshipGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChampionshipWhereInput;
    orderBy?: Prisma.ChampionshipOrderByWithAggregationInput | Prisma.ChampionshipOrderByWithAggregationInput[];
    by: Prisma.ChampionshipScalarFieldEnum[] | Prisma.ChampionshipScalarFieldEnum;
    having?: Prisma.ChampionshipScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChampionshipCountAggregateInputType | true;
    _avg?: ChampionshipAvgAggregateInputType;
    _sum?: ChampionshipSumAggregateInputType;
    _min?: ChampionshipMinAggregateInputType;
    _max?: ChampionshipMaxAggregateInputType;
};
export type ChampionshipGroupByOutputType = {
    id: number;
    leagueId: number;
    season: number;
    name: string;
    country: string;
    flags: string;
    type: $Enums.ChampionshipType;
    status: $Enums.ChampionshipStatus;
    isCurrentSeason: boolean;
    allowNewPools: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: ChampionshipCountAggregateOutputType | null;
    _avg: ChampionshipAvgAggregateOutputType | null;
    _sum: ChampionshipSumAggregateOutputType | null;
    _min: ChampionshipMinAggregateOutputType | null;
    _max: ChampionshipMaxAggregateOutputType | null;
};
export type GetChampionshipGroupByPayload<T extends ChampionshipGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ChampionshipGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ChampionshipGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ChampionshipGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ChampionshipGroupByOutputType[P]>;
}>>;
export type ChampionshipWhereInput = {
    AND?: Prisma.ChampionshipWhereInput | Prisma.ChampionshipWhereInput[];
    OR?: Prisma.ChampionshipWhereInput[];
    NOT?: Prisma.ChampionshipWhereInput | Prisma.ChampionshipWhereInput[];
    id?: Prisma.IntFilter<"Championship"> | number;
    leagueId?: Prisma.IntFilter<"Championship"> | number;
    season?: Prisma.IntFilter<"Championship"> | number;
    name?: Prisma.StringFilter<"Championship"> | string;
    country?: Prisma.StringFilter<"Championship"> | string;
    flags?: Prisma.StringFilter<"Championship"> | string;
    type?: Prisma.EnumChampionshipTypeFilter<"Championship"> | $Enums.ChampionshipType;
    status?: Prisma.EnumChampionshipStatusFilter<"Championship"> | $Enums.ChampionshipStatus;
    isCurrentSeason?: Prisma.BoolFilter<"Championship"> | boolean;
    allowNewPools?: Prisma.BoolFilter<"Championship"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Championship"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Championship"> | Date | string;
    league?: Prisma.XOR<Prisma.LeagueScalarRelationFilter, Prisma.LeagueWhereInput>;
    fixtures?: Prisma.FixtureListRelationFilter;
    pools?: Prisma.PoolListRelationFilter;
};
export type ChampionshipOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    leagueId?: Prisma.SortOrder;
    season?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    flags?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isCurrentSeason?: Prisma.SortOrder;
    allowNewPools?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    league?: Prisma.LeagueOrderByWithRelationInput;
    fixtures?: Prisma.FixtureOrderByRelationAggregateInput;
    pools?: Prisma.PoolOrderByRelationAggregateInput;
    _relevance?: Prisma.ChampionshipOrderByRelevanceInput;
};
export type ChampionshipWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.ChampionshipWhereInput | Prisma.ChampionshipWhereInput[];
    OR?: Prisma.ChampionshipWhereInput[];
    NOT?: Prisma.ChampionshipWhereInput | Prisma.ChampionshipWhereInput[];
    leagueId?: Prisma.IntFilter<"Championship"> | number;
    season?: Prisma.IntFilter<"Championship"> | number;
    name?: Prisma.StringFilter<"Championship"> | string;
    country?: Prisma.StringFilter<"Championship"> | string;
    flags?: Prisma.StringFilter<"Championship"> | string;
    type?: Prisma.EnumChampionshipTypeFilter<"Championship"> | $Enums.ChampionshipType;
    status?: Prisma.EnumChampionshipStatusFilter<"Championship"> | $Enums.ChampionshipStatus;
    isCurrentSeason?: Prisma.BoolFilter<"Championship"> | boolean;
    allowNewPools?: Prisma.BoolFilter<"Championship"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Championship"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Championship"> | Date | string;
    league?: Prisma.XOR<Prisma.LeagueScalarRelationFilter, Prisma.LeagueWhereInput>;
    fixtures?: Prisma.FixtureListRelationFilter;
    pools?: Prisma.PoolListRelationFilter;
}, "id">;
export type ChampionshipOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    leagueId?: Prisma.SortOrder;
    season?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    flags?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isCurrentSeason?: Prisma.SortOrder;
    allowNewPools?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ChampionshipCountOrderByAggregateInput;
    _avg?: Prisma.ChampionshipAvgOrderByAggregateInput;
    _max?: Prisma.ChampionshipMaxOrderByAggregateInput;
    _min?: Prisma.ChampionshipMinOrderByAggregateInput;
    _sum?: Prisma.ChampionshipSumOrderByAggregateInput;
};
export type ChampionshipScalarWhereWithAggregatesInput = {
    AND?: Prisma.ChampionshipScalarWhereWithAggregatesInput | Prisma.ChampionshipScalarWhereWithAggregatesInput[];
    OR?: Prisma.ChampionshipScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ChampionshipScalarWhereWithAggregatesInput | Prisma.ChampionshipScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Championship"> | number;
    leagueId?: Prisma.IntWithAggregatesFilter<"Championship"> | number;
    season?: Prisma.IntWithAggregatesFilter<"Championship"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Championship"> | string;
    country?: Prisma.StringWithAggregatesFilter<"Championship"> | string;
    flags?: Prisma.StringWithAggregatesFilter<"Championship"> | string;
    type?: Prisma.EnumChampionshipTypeWithAggregatesFilter<"Championship"> | $Enums.ChampionshipType;
    status?: Prisma.EnumChampionshipStatusWithAggregatesFilter<"Championship"> | $Enums.ChampionshipStatus;
    isCurrentSeason?: Prisma.BoolWithAggregatesFilter<"Championship"> | boolean;
    allowNewPools?: Prisma.BoolWithAggregatesFilter<"Championship"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Championship"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Championship"> | Date | string;
};
export type ChampionshipCreateInput = {
    season: number;
    name: string;
    country: string;
    flags?: string;
    type: $Enums.ChampionshipType;
    status?: $Enums.ChampionshipStatus;
    isCurrentSeason?: boolean;
    allowNewPools?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    league: Prisma.LeagueCreateNestedOneWithoutChampionshipsInput;
    fixtures?: Prisma.FixtureCreateNestedManyWithoutChampionshipInput;
    pools?: Prisma.PoolCreateNestedManyWithoutChampionshipInput;
};
export type ChampionshipUncheckedCreateInput = {
    id?: number;
    leagueId: number;
    season: number;
    name: string;
    country: string;
    flags?: string;
    type: $Enums.ChampionshipType;
    status?: $Enums.ChampionshipStatus;
    isCurrentSeason?: boolean;
    allowNewPools?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fixtures?: Prisma.FixtureUncheckedCreateNestedManyWithoutChampionshipInput;
    pools?: Prisma.PoolUncheckedCreateNestedManyWithoutChampionshipInput;
};
export type ChampionshipUpdateInput = {
    season?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    flags?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumChampionshipTypeFieldUpdateOperationsInput | $Enums.ChampionshipType;
    status?: Prisma.EnumChampionshipStatusFieldUpdateOperationsInput | $Enums.ChampionshipStatus;
    isCurrentSeason?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowNewPools?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    league?: Prisma.LeagueUpdateOneRequiredWithoutChampionshipsNestedInput;
    fixtures?: Prisma.FixtureUpdateManyWithoutChampionshipNestedInput;
    pools?: Prisma.PoolUpdateManyWithoutChampionshipNestedInput;
};
export type ChampionshipUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    leagueId?: Prisma.IntFieldUpdateOperationsInput | number;
    season?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    flags?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumChampionshipTypeFieldUpdateOperationsInput | $Enums.ChampionshipType;
    status?: Prisma.EnumChampionshipStatusFieldUpdateOperationsInput | $Enums.ChampionshipStatus;
    isCurrentSeason?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowNewPools?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fixtures?: Prisma.FixtureUncheckedUpdateManyWithoutChampionshipNestedInput;
    pools?: Prisma.PoolUncheckedUpdateManyWithoutChampionshipNestedInput;
};
export type ChampionshipCreateManyInput = {
    id?: number;
    leagueId: number;
    season: number;
    name: string;
    country: string;
    flags?: string;
    type: $Enums.ChampionshipType;
    status?: $Enums.ChampionshipStatus;
    isCurrentSeason?: boolean;
    allowNewPools?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChampionshipUpdateManyMutationInput = {
    season?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    flags?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumChampionshipTypeFieldUpdateOperationsInput | $Enums.ChampionshipType;
    status?: Prisma.EnumChampionshipStatusFieldUpdateOperationsInput | $Enums.ChampionshipStatus;
    isCurrentSeason?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowNewPools?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChampionshipUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    leagueId?: Prisma.IntFieldUpdateOperationsInput | number;
    season?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    flags?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumChampionshipTypeFieldUpdateOperationsInput | $Enums.ChampionshipType;
    status?: Prisma.EnumChampionshipStatusFieldUpdateOperationsInput | $Enums.ChampionshipStatus;
    isCurrentSeason?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowNewPools?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChampionshipListRelationFilter = {
    every?: Prisma.ChampionshipWhereInput;
    some?: Prisma.ChampionshipWhereInput;
    none?: Prisma.ChampionshipWhereInput;
};
export type ChampionshipOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ChampionshipOrderByRelevanceInput = {
    fields: Prisma.ChampionshipOrderByRelevanceFieldEnum | Prisma.ChampionshipOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type ChampionshipCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    leagueId?: Prisma.SortOrder;
    season?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    flags?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isCurrentSeason?: Prisma.SortOrder;
    allowNewPools?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChampionshipAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    leagueId?: Prisma.SortOrder;
    season?: Prisma.SortOrder;
};
export type ChampionshipMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    leagueId?: Prisma.SortOrder;
    season?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    flags?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isCurrentSeason?: Prisma.SortOrder;
    allowNewPools?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChampionshipMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    leagueId?: Prisma.SortOrder;
    season?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    flags?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isCurrentSeason?: Prisma.SortOrder;
    allowNewPools?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChampionshipSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    leagueId?: Prisma.SortOrder;
    season?: Prisma.SortOrder;
};
export type ChampionshipScalarRelationFilter = {
    is?: Prisma.ChampionshipWhereInput;
    isNot?: Prisma.ChampionshipWhereInput;
};
export type ChampionshipCreateNestedManyWithoutLeagueInput = {
    create?: Prisma.XOR<Prisma.ChampionshipCreateWithoutLeagueInput, Prisma.ChampionshipUncheckedCreateWithoutLeagueInput> | Prisma.ChampionshipCreateWithoutLeagueInput[] | Prisma.ChampionshipUncheckedCreateWithoutLeagueInput[];
    connectOrCreate?: Prisma.ChampionshipCreateOrConnectWithoutLeagueInput | Prisma.ChampionshipCreateOrConnectWithoutLeagueInput[];
    createMany?: Prisma.ChampionshipCreateManyLeagueInputEnvelope;
    connect?: Prisma.ChampionshipWhereUniqueInput | Prisma.ChampionshipWhereUniqueInput[];
};
export type ChampionshipUncheckedCreateNestedManyWithoutLeagueInput = {
    create?: Prisma.XOR<Prisma.ChampionshipCreateWithoutLeagueInput, Prisma.ChampionshipUncheckedCreateWithoutLeagueInput> | Prisma.ChampionshipCreateWithoutLeagueInput[] | Prisma.ChampionshipUncheckedCreateWithoutLeagueInput[];
    connectOrCreate?: Prisma.ChampionshipCreateOrConnectWithoutLeagueInput | Prisma.ChampionshipCreateOrConnectWithoutLeagueInput[];
    createMany?: Prisma.ChampionshipCreateManyLeagueInputEnvelope;
    connect?: Prisma.ChampionshipWhereUniqueInput | Prisma.ChampionshipWhereUniqueInput[];
};
export type ChampionshipUpdateManyWithoutLeagueNestedInput = {
    create?: Prisma.XOR<Prisma.ChampionshipCreateWithoutLeagueInput, Prisma.ChampionshipUncheckedCreateWithoutLeagueInput> | Prisma.ChampionshipCreateWithoutLeagueInput[] | Prisma.ChampionshipUncheckedCreateWithoutLeagueInput[];
    connectOrCreate?: Prisma.ChampionshipCreateOrConnectWithoutLeagueInput | Prisma.ChampionshipCreateOrConnectWithoutLeagueInput[];
    upsert?: Prisma.ChampionshipUpsertWithWhereUniqueWithoutLeagueInput | Prisma.ChampionshipUpsertWithWhereUniqueWithoutLeagueInput[];
    createMany?: Prisma.ChampionshipCreateManyLeagueInputEnvelope;
    set?: Prisma.ChampionshipWhereUniqueInput | Prisma.ChampionshipWhereUniqueInput[];
    disconnect?: Prisma.ChampionshipWhereUniqueInput | Prisma.ChampionshipWhereUniqueInput[];
    delete?: Prisma.ChampionshipWhereUniqueInput | Prisma.ChampionshipWhereUniqueInput[];
    connect?: Prisma.ChampionshipWhereUniqueInput | Prisma.ChampionshipWhereUniqueInput[];
    update?: Prisma.ChampionshipUpdateWithWhereUniqueWithoutLeagueInput | Prisma.ChampionshipUpdateWithWhereUniqueWithoutLeagueInput[];
    updateMany?: Prisma.ChampionshipUpdateManyWithWhereWithoutLeagueInput | Prisma.ChampionshipUpdateManyWithWhereWithoutLeagueInput[];
    deleteMany?: Prisma.ChampionshipScalarWhereInput | Prisma.ChampionshipScalarWhereInput[];
};
export type ChampionshipUncheckedUpdateManyWithoutLeagueNestedInput = {
    create?: Prisma.XOR<Prisma.ChampionshipCreateWithoutLeagueInput, Prisma.ChampionshipUncheckedCreateWithoutLeagueInput> | Prisma.ChampionshipCreateWithoutLeagueInput[] | Prisma.ChampionshipUncheckedCreateWithoutLeagueInput[];
    connectOrCreate?: Prisma.ChampionshipCreateOrConnectWithoutLeagueInput | Prisma.ChampionshipCreateOrConnectWithoutLeagueInput[];
    upsert?: Prisma.ChampionshipUpsertWithWhereUniqueWithoutLeagueInput | Prisma.ChampionshipUpsertWithWhereUniqueWithoutLeagueInput[];
    createMany?: Prisma.ChampionshipCreateManyLeagueInputEnvelope;
    set?: Prisma.ChampionshipWhereUniqueInput | Prisma.ChampionshipWhereUniqueInput[];
    disconnect?: Prisma.ChampionshipWhereUniqueInput | Prisma.ChampionshipWhereUniqueInput[];
    delete?: Prisma.ChampionshipWhereUniqueInput | Prisma.ChampionshipWhereUniqueInput[];
    connect?: Prisma.ChampionshipWhereUniqueInput | Prisma.ChampionshipWhereUniqueInput[];
    update?: Prisma.ChampionshipUpdateWithWhereUniqueWithoutLeagueInput | Prisma.ChampionshipUpdateWithWhereUniqueWithoutLeagueInput[];
    updateMany?: Prisma.ChampionshipUpdateManyWithWhereWithoutLeagueInput | Prisma.ChampionshipUpdateManyWithWhereWithoutLeagueInput[];
    deleteMany?: Prisma.ChampionshipScalarWhereInput | Prisma.ChampionshipScalarWhereInput[];
};
export type EnumChampionshipTypeFieldUpdateOperationsInput = {
    set?: $Enums.ChampionshipType;
};
export type EnumChampionshipStatusFieldUpdateOperationsInput = {
    set?: $Enums.ChampionshipStatus;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type ChampionshipCreateNestedOneWithoutFixturesInput = {
    create?: Prisma.XOR<Prisma.ChampionshipCreateWithoutFixturesInput, Prisma.ChampionshipUncheckedCreateWithoutFixturesInput>;
    connectOrCreate?: Prisma.ChampionshipCreateOrConnectWithoutFixturesInput;
    connect?: Prisma.ChampionshipWhereUniqueInput;
};
export type ChampionshipUpdateOneRequiredWithoutFixturesNestedInput = {
    create?: Prisma.XOR<Prisma.ChampionshipCreateWithoutFixturesInput, Prisma.ChampionshipUncheckedCreateWithoutFixturesInput>;
    connectOrCreate?: Prisma.ChampionshipCreateOrConnectWithoutFixturesInput;
    upsert?: Prisma.ChampionshipUpsertWithoutFixturesInput;
    connect?: Prisma.ChampionshipWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ChampionshipUpdateToOneWithWhereWithoutFixturesInput, Prisma.ChampionshipUpdateWithoutFixturesInput>, Prisma.ChampionshipUncheckedUpdateWithoutFixturesInput>;
};
export type ChampionshipCreateNestedOneWithoutPoolsInput = {
    create?: Prisma.XOR<Prisma.ChampionshipCreateWithoutPoolsInput, Prisma.ChampionshipUncheckedCreateWithoutPoolsInput>;
    connectOrCreate?: Prisma.ChampionshipCreateOrConnectWithoutPoolsInput;
    connect?: Prisma.ChampionshipWhereUniqueInput;
};
export type ChampionshipUpdateOneRequiredWithoutPoolsNestedInput = {
    create?: Prisma.XOR<Prisma.ChampionshipCreateWithoutPoolsInput, Prisma.ChampionshipUncheckedCreateWithoutPoolsInput>;
    connectOrCreate?: Prisma.ChampionshipCreateOrConnectWithoutPoolsInput;
    upsert?: Prisma.ChampionshipUpsertWithoutPoolsInput;
    connect?: Prisma.ChampionshipWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ChampionshipUpdateToOneWithWhereWithoutPoolsInput, Prisma.ChampionshipUpdateWithoutPoolsInput>, Prisma.ChampionshipUncheckedUpdateWithoutPoolsInput>;
};
export type ChampionshipCreateWithoutLeagueInput = {
    season: number;
    name: string;
    country: string;
    flags?: string;
    type: $Enums.ChampionshipType;
    status?: $Enums.ChampionshipStatus;
    isCurrentSeason?: boolean;
    allowNewPools?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fixtures?: Prisma.FixtureCreateNestedManyWithoutChampionshipInput;
    pools?: Prisma.PoolCreateNestedManyWithoutChampionshipInput;
};
export type ChampionshipUncheckedCreateWithoutLeagueInput = {
    id?: number;
    season: number;
    name: string;
    country: string;
    flags?: string;
    type: $Enums.ChampionshipType;
    status?: $Enums.ChampionshipStatus;
    isCurrentSeason?: boolean;
    allowNewPools?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fixtures?: Prisma.FixtureUncheckedCreateNestedManyWithoutChampionshipInput;
    pools?: Prisma.PoolUncheckedCreateNestedManyWithoutChampionshipInput;
};
export type ChampionshipCreateOrConnectWithoutLeagueInput = {
    where: Prisma.ChampionshipWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChampionshipCreateWithoutLeagueInput, Prisma.ChampionshipUncheckedCreateWithoutLeagueInput>;
};
export type ChampionshipCreateManyLeagueInputEnvelope = {
    data: Prisma.ChampionshipCreateManyLeagueInput | Prisma.ChampionshipCreateManyLeagueInput[];
    skipDuplicates?: boolean;
};
export type ChampionshipUpsertWithWhereUniqueWithoutLeagueInput = {
    where: Prisma.ChampionshipWhereUniqueInput;
    update: Prisma.XOR<Prisma.ChampionshipUpdateWithoutLeagueInput, Prisma.ChampionshipUncheckedUpdateWithoutLeagueInput>;
    create: Prisma.XOR<Prisma.ChampionshipCreateWithoutLeagueInput, Prisma.ChampionshipUncheckedCreateWithoutLeagueInput>;
};
export type ChampionshipUpdateWithWhereUniqueWithoutLeagueInput = {
    where: Prisma.ChampionshipWhereUniqueInput;
    data: Prisma.XOR<Prisma.ChampionshipUpdateWithoutLeagueInput, Prisma.ChampionshipUncheckedUpdateWithoutLeagueInput>;
};
export type ChampionshipUpdateManyWithWhereWithoutLeagueInput = {
    where: Prisma.ChampionshipScalarWhereInput;
    data: Prisma.XOR<Prisma.ChampionshipUpdateManyMutationInput, Prisma.ChampionshipUncheckedUpdateManyWithoutLeagueInput>;
};
export type ChampionshipScalarWhereInput = {
    AND?: Prisma.ChampionshipScalarWhereInput | Prisma.ChampionshipScalarWhereInput[];
    OR?: Prisma.ChampionshipScalarWhereInput[];
    NOT?: Prisma.ChampionshipScalarWhereInput | Prisma.ChampionshipScalarWhereInput[];
    id?: Prisma.IntFilter<"Championship"> | number;
    leagueId?: Prisma.IntFilter<"Championship"> | number;
    season?: Prisma.IntFilter<"Championship"> | number;
    name?: Prisma.StringFilter<"Championship"> | string;
    country?: Prisma.StringFilter<"Championship"> | string;
    flags?: Prisma.StringFilter<"Championship"> | string;
    type?: Prisma.EnumChampionshipTypeFilter<"Championship"> | $Enums.ChampionshipType;
    status?: Prisma.EnumChampionshipStatusFilter<"Championship"> | $Enums.ChampionshipStatus;
    isCurrentSeason?: Prisma.BoolFilter<"Championship"> | boolean;
    allowNewPools?: Prisma.BoolFilter<"Championship"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Championship"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Championship"> | Date | string;
};
export type ChampionshipCreateWithoutFixturesInput = {
    season: number;
    name: string;
    country: string;
    flags?: string;
    type: $Enums.ChampionshipType;
    status?: $Enums.ChampionshipStatus;
    isCurrentSeason?: boolean;
    allowNewPools?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    league: Prisma.LeagueCreateNestedOneWithoutChampionshipsInput;
    pools?: Prisma.PoolCreateNestedManyWithoutChampionshipInput;
};
export type ChampionshipUncheckedCreateWithoutFixturesInput = {
    id?: number;
    leagueId: number;
    season: number;
    name: string;
    country: string;
    flags?: string;
    type: $Enums.ChampionshipType;
    status?: $Enums.ChampionshipStatus;
    isCurrentSeason?: boolean;
    allowNewPools?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pools?: Prisma.PoolUncheckedCreateNestedManyWithoutChampionshipInput;
};
export type ChampionshipCreateOrConnectWithoutFixturesInput = {
    where: Prisma.ChampionshipWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChampionshipCreateWithoutFixturesInput, Prisma.ChampionshipUncheckedCreateWithoutFixturesInput>;
};
export type ChampionshipUpsertWithoutFixturesInput = {
    update: Prisma.XOR<Prisma.ChampionshipUpdateWithoutFixturesInput, Prisma.ChampionshipUncheckedUpdateWithoutFixturesInput>;
    create: Prisma.XOR<Prisma.ChampionshipCreateWithoutFixturesInput, Prisma.ChampionshipUncheckedCreateWithoutFixturesInput>;
    where?: Prisma.ChampionshipWhereInput;
};
export type ChampionshipUpdateToOneWithWhereWithoutFixturesInput = {
    where?: Prisma.ChampionshipWhereInput;
    data: Prisma.XOR<Prisma.ChampionshipUpdateWithoutFixturesInput, Prisma.ChampionshipUncheckedUpdateWithoutFixturesInput>;
};
export type ChampionshipUpdateWithoutFixturesInput = {
    season?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    flags?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumChampionshipTypeFieldUpdateOperationsInput | $Enums.ChampionshipType;
    status?: Prisma.EnumChampionshipStatusFieldUpdateOperationsInput | $Enums.ChampionshipStatus;
    isCurrentSeason?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowNewPools?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    league?: Prisma.LeagueUpdateOneRequiredWithoutChampionshipsNestedInput;
    pools?: Prisma.PoolUpdateManyWithoutChampionshipNestedInput;
};
export type ChampionshipUncheckedUpdateWithoutFixturesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    leagueId?: Prisma.IntFieldUpdateOperationsInput | number;
    season?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    flags?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumChampionshipTypeFieldUpdateOperationsInput | $Enums.ChampionshipType;
    status?: Prisma.EnumChampionshipStatusFieldUpdateOperationsInput | $Enums.ChampionshipStatus;
    isCurrentSeason?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowNewPools?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pools?: Prisma.PoolUncheckedUpdateManyWithoutChampionshipNestedInput;
};
export type ChampionshipCreateWithoutPoolsInput = {
    season: number;
    name: string;
    country: string;
    flags?: string;
    type: $Enums.ChampionshipType;
    status?: $Enums.ChampionshipStatus;
    isCurrentSeason?: boolean;
    allowNewPools?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    league: Prisma.LeagueCreateNestedOneWithoutChampionshipsInput;
    fixtures?: Prisma.FixtureCreateNestedManyWithoutChampionshipInput;
};
export type ChampionshipUncheckedCreateWithoutPoolsInput = {
    id?: number;
    leagueId: number;
    season: number;
    name: string;
    country: string;
    flags?: string;
    type: $Enums.ChampionshipType;
    status?: $Enums.ChampionshipStatus;
    isCurrentSeason?: boolean;
    allowNewPools?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fixtures?: Prisma.FixtureUncheckedCreateNestedManyWithoutChampionshipInput;
};
export type ChampionshipCreateOrConnectWithoutPoolsInput = {
    where: Prisma.ChampionshipWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChampionshipCreateWithoutPoolsInput, Prisma.ChampionshipUncheckedCreateWithoutPoolsInput>;
};
export type ChampionshipUpsertWithoutPoolsInput = {
    update: Prisma.XOR<Prisma.ChampionshipUpdateWithoutPoolsInput, Prisma.ChampionshipUncheckedUpdateWithoutPoolsInput>;
    create: Prisma.XOR<Prisma.ChampionshipCreateWithoutPoolsInput, Prisma.ChampionshipUncheckedCreateWithoutPoolsInput>;
    where?: Prisma.ChampionshipWhereInput;
};
export type ChampionshipUpdateToOneWithWhereWithoutPoolsInput = {
    where?: Prisma.ChampionshipWhereInput;
    data: Prisma.XOR<Prisma.ChampionshipUpdateWithoutPoolsInput, Prisma.ChampionshipUncheckedUpdateWithoutPoolsInput>;
};
export type ChampionshipUpdateWithoutPoolsInput = {
    season?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    flags?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumChampionshipTypeFieldUpdateOperationsInput | $Enums.ChampionshipType;
    status?: Prisma.EnumChampionshipStatusFieldUpdateOperationsInput | $Enums.ChampionshipStatus;
    isCurrentSeason?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowNewPools?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    league?: Prisma.LeagueUpdateOneRequiredWithoutChampionshipsNestedInput;
    fixtures?: Prisma.FixtureUpdateManyWithoutChampionshipNestedInput;
};
export type ChampionshipUncheckedUpdateWithoutPoolsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    leagueId?: Prisma.IntFieldUpdateOperationsInput | number;
    season?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    flags?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumChampionshipTypeFieldUpdateOperationsInput | $Enums.ChampionshipType;
    status?: Prisma.EnumChampionshipStatusFieldUpdateOperationsInput | $Enums.ChampionshipStatus;
    isCurrentSeason?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowNewPools?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fixtures?: Prisma.FixtureUncheckedUpdateManyWithoutChampionshipNestedInput;
};
export type ChampionshipCreateManyLeagueInput = {
    id?: number;
    season: number;
    name: string;
    country: string;
    flags?: string;
    type: $Enums.ChampionshipType;
    status?: $Enums.ChampionshipStatus;
    isCurrentSeason?: boolean;
    allowNewPools?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChampionshipUpdateWithoutLeagueInput = {
    season?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    flags?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumChampionshipTypeFieldUpdateOperationsInput | $Enums.ChampionshipType;
    status?: Prisma.EnumChampionshipStatusFieldUpdateOperationsInput | $Enums.ChampionshipStatus;
    isCurrentSeason?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowNewPools?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fixtures?: Prisma.FixtureUpdateManyWithoutChampionshipNestedInput;
    pools?: Prisma.PoolUpdateManyWithoutChampionshipNestedInput;
};
export type ChampionshipUncheckedUpdateWithoutLeagueInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    season?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    flags?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumChampionshipTypeFieldUpdateOperationsInput | $Enums.ChampionshipType;
    status?: Prisma.EnumChampionshipStatusFieldUpdateOperationsInput | $Enums.ChampionshipStatus;
    isCurrentSeason?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowNewPools?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fixtures?: Prisma.FixtureUncheckedUpdateManyWithoutChampionshipNestedInput;
    pools?: Prisma.PoolUncheckedUpdateManyWithoutChampionshipNestedInput;
};
export type ChampionshipUncheckedUpdateManyWithoutLeagueInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    season?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    flags?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumChampionshipTypeFieldUpdateOperationsInput | $Enums.ChampionshipType;
    status?: Prisma.EnumChampionshipStatusFieldUpdateOperationsInput | $Enums.ChampionshipStatus;
    isCurrentSeason?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    allowNewPools?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChampionshipCountOutputType = {
    fixtures: number;
    pools: number;
};
export type ChampionshipCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    fixtures?: boolean | ChampionshipCountOutputTypeCountFixturesArgs;
    pools?: boolean | ChampionshipCountOutputTypeCountPoolsArgs;
};
export type ChampionshipCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChampionshipCountOutputTypeSelect<ExtArgs> | null;
};
export type ChampionshipCountOutputTypeCountFixturesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FixtureWhereInput;
};
export type ChampionshipCountOutputTypeCountPoolsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PoolWhereInput;
};
export type ChampionshipSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    leagueId?: boolean;
    season?: boolean;
    name?: boolean;
    country?: boolean;
    flags?: boolean;
    type?: boolean;
    status?: boolean;
    isCurrentSeason?: boolean;
    allowNewPools?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    league?: boolean | Prisma.LeagueDefaultArgs<ExtArgs>;
    fixtures?: boolean | Prisma.Championship$fixturesArgs<ExtArgs>;
    pools?: boolean | Prisma.Championship$poolsArgs<ExtArgs>;
    _count?: boolean | Prisma.ChampionshipCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["championship"]>;
export type ChampionshipSelectScalar = {
    id?: boolean;
    leagueId?: boolean;
    season?: boolean;
    name?: boolean;
    country?: boolean;
    flags?: boolean;
    type?: boolean;
    status?: boolean;
    isCurrentSeason?: boolean;
    allowNewPools?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ChampionshipOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "leagueId" | "season" | "name" | "country" | "flags" | "type" | "status" | "isCurrentSeason" | "allowNewPools" | "createdAt" | "updatedAt", ExtArgs["result"]["championship"]>;
export type ChampionshipInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    league?: boolean | Prisma.LeagueDefaultArgs<ExtArgs>;
    fixtures?: boolean | Prisma.Championship$fixturesArgs<ExtArgs>;
    pools?: boolean | Prisma.Championship$poolsArgs<ExtArgs>;
    _count?: boolean | Prisma.ChampionshipCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $ChampionshipPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Championship";
    objects: {
        league: Prisma.$LeaguePayload<ExtArgs>;
        fixtures: Prisma.$FixturePayload<ExtArgs>[];
        pools: Prisma.$PoolPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        leagueId: number;
        season: number;
        name: string;
        country: string;
        flags: string;
        type: $Enums.ChampionshipType;
        status: $Enums.ChampionshipStatus;
        isCurrentSeason: boolean;
        allowNewPools: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["championship"]>;
    composites: {};
};
export type ChampionshipGetPayload<S extends boolean | null | undefined | ChampionshipDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ChampionshipPayload, S>;
export type ChampionshipCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ChampionshipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ChampionshipCountAggregateInputType | true;
};
export interface ChampionshipDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Championship'];
        meta: {
            name: 'Championship';
        };
    };
    findUnique<T extends ChampionshipFindUniqueArgs>(args: Prisma.SelectSubset<T, ChampionshipFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ChampionshipClient<runtime.Types.Result.GetResult<Prisma.$ChampionshipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ChampionshipFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ChampionshipFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChampionshipClient<runtime.Types.Result.GetResult<Prisma.$ChampionshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ChampionshipFindFirstArgs>(args?: Prisma.SelectSubset<T, ChampionshipFindFirstArgs<ExtArgs>>): Prisma.Prisma__ChampionshipClient<runtime.Types.Result.GetResult<Prisma.$ChampionshipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ChampionshipFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ChampionshipFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChampionshipClient<runtime.Types.Result.GetResult<Prisma.$ChampionshipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ChampionshipFindManyArgs>(args?: Prisma.SelectSubset<T, ChampionshipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChampionshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ChampionshipCreateArgs>(args: Prisma.SelectSubset<T, ChampionshipCreateArgs<ExtArgs>>): Prisma.Prisma__ChampionshipClient<runtime.Types.Result.GetResult<Prisma.$ChampionshipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ChampionshipCreateManyArgs>(args?: Prisma.SelectSubset<T, ChampionshipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends ChampionshipDeleteArgs>(args: Prisma.SelectSubset<T, ChampionshipDeleteArgs<ExtArgs>>): Prisma.Prisma__ChampionshipClient<runtime.Types.Result.GetResult<Prisma.$ChampionshipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ChampionshipUpdateArgs>(args: Prisma.SelectSubset<T, ChampionshipUpdateArgs<ExtArgs>>): Prisma.Prisma__ChampionshipClient<runtime.Types.Result.GetResult<Prisma.$ChampionshipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ChampionshipDeleteManyArgs>(args?: Prisma.SelectSubset<T, ChampionshipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ChampionshipUpdateManyArgs>(args: Prisma.SelectSubset<T, ChampionshipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends ChampionshipUpsertArgs>(args: Prisma.SelectSubset<T, ChampionshipUpsertArgs<ExtArgs>>): Prisma.Prisma__ChampionshipClient<runtime.Types.Result.GetResult<Prisma.$ChampionshipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ChampionshipCountArgs>(args?: Prisma.Subset<T, ChampionshipCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ChampionshipCountAggregateOutputType> : number>;
    aggregate<T extends ChampionshipAggregateArgs>(args: Prisma.Subset<T, ChampionshipAggregateArgs>): Prisma.PrismaPromise<GetChampionshipAggregateType<T>>;
    groupBy<T extends ChampionshipGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ChampionshipGroupByArgs['orderBy'];
    } : {
        orderBy?: ChampionshipGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ChampionshipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChampionshipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ChampionshipFieldRefs;
}
export interface Prisma__ChampionshipClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    league<T extends Prisma.LeagueDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LeagueDefaultArgs<ExtArgs>>): Prisma.Prisma__LeagueClient<runtime.Types.Result.GetResult<Prisma.$LeaguePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    fixtures<T extends Prisma.Championship$fixturesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Championship$fixturesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FixturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    pools<T extends Prisma.Championship$poolsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Championship$poolsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ChampionshipFieldRefs {
    readonly id: Prisma.FieldRef<"Championship", 'Int'>;
    readonly leagueId: Prisma.FieldRef<"Championship", 'Int'>;
    readonly season: Prisma.FieldRef<"Championship", 'Int'>;
    readonly name: Prisma.FieldRef<"Championship", 'String'>;
    readonly country: Prisma.FieldRef<"Championship", 'String'>;
    readonly flags: Prisma.FieldRef<"Championship", 'String'>;
    readonly type: Prisma.FieldRef<"Championship", 'ChampionshipType'>;
    readonly status: Prisma.FieldRef<"Championship", 'ChampionshipStatus'>;
    readonly isCurrentSeason: Prisma.FieldRef<"Championship", 'Boolean'>;
    readonly allowNewPools: Prisma.FieldRef<"Championship", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Championship", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Championship", 'DateTime'>;
}
export type ChampionshipFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChampionshipSelect<ExtArgs> | null;
    omit?: Prisma.ChampionshipOmit<ExtArgs> | null;
    include?: Prisma.ChampionshipInclude<ExtArgs> | null;
    where: Prisma.ChampionshipWhereUniqueInput;
};
export type ChampionshipFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChampionshipSelect<ExtArgs> | null;
    omit?: Prisma.ChampionshipOmit<ExtArgs> | null;
    include?: Prisma.ChampionshipInclude<ExtArgs> | null;
    where: Prisma.ChampionshipWhereUniqueInput;
};
export type ChampionshipFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ChampionshipFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ChampionshipFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ChampionshipCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChampionshipSelect<ExtArgs> | null;
    omit?: Prisma.ChampionshipOmit<ExtArgs> | null;
    include?: Prisma.ChampionshipInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChampionshipCreateInput, Prisma.ChampionshipUncheckedCreateInput>;
};
export type ChampionshipCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ChampionshipCreateManyInput | Prisma.ChampionshipCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ChampionshipUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChampionshipSelect<ExtArgs> | null;
    omit?: Prisma.ChampionshipOmit<ExtArgs> | null;
    include?: Prisma.ChampionshipInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChampionshipUpdateInput, Prisma.ChampionshipUncheckedUpdateInput>;
    where: Prisma.ChampionshipWhereUniqueInput;
};
export type ChampionshipUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ChampionshipUpdateManyMutationInput, Prisma.ChampionshipUncheckedUpdateManyInput>;
    where?: Prisma.ChampionshipWhereInput;
    limit?: number;
};
export type ChampionshipUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChampionshipSelect<ExtArgs> | null;
    omit?: Prisma.ChampionshipOmit<ExtArgs> | null;
    include?: Prisma.ChampionshipInclude<ExtArgs> | null;
    where: Prisma.ChampionshipWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChampionshipCreateInput, Prisma.ChampionshipUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ChampionshipUpdateInput, Prisma.ChampionshipUncheckedUpdateInput>;
};
export type ChampionshipDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChampionshipSelect<ExtArgs> | null;
    omit?: Prisma.ChampionshipOmit<ExtArgs> | null;
    include?: Prisma.ChampionshipInclude<ExtArgs> | null;
    where: Prisma.ChampionshipWhereUniqueInput;
};
export type ChampionshipDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChampionshipWhereInput;
    limit?: number;
};
export type Championship$fixturesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FixtureSelect<ExtArgs> | null;
    omit?: Prisma.FixtureOmit<ExtArgs> | null;
    include?: Prisma.FixtureInclude<ExtArgs> | null;
    where?: Prisma.FixtureWhereInput;
    orderBy?: Prisma.FixtureOrderByWithRelationInput | Prisma.FixtureOrderByWithRelationInput[];
    cursor?: Prisma.FixtureWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FixtureScalarFieldEnum | Prisma.FixtureScalarFieldEnum[];
};
export type Championship$poolsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ChampionshipDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChampionshipSelect<ExtArgs> | null;
    omit?: Prisma.ChampionshipOmit<ExtArgs> | null;
    include?: Prisma.ChampionshipInclude<ExtArgs> | null;
};
