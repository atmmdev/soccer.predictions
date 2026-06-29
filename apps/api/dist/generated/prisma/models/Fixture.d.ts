import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FixtureModel = runtime.Types.Result.DefaultSelection<Prisma.$FixturePayload>;
export type AggregateFixture = {
    _count: FixtureCountAggregateOutputType | null;
    _avg: FixtureAvgAggregateOutputType | null;
    _sum: FixtureSumAggregateOutputType | null;
    _min: FixtureMinAggregateOutputType | null;
    _max: FixtureMaxAggregateOutputType | null;
};
export type FixtureAvgAggregateOutputType = {
    id: number | null;
    externalId: number | null;
    championshipId: number | null;
    homeTeamId: number | null;
    awayTeamId: number | null;
    homeScore: number | null;
    awayScore: number | null;
    round: number | null;
};
export type FixtureSumAggregateOutputType = {
    id: number | null;
    externalId: number | null;
    championshipId: number | null;
    homeTeamId: number | null;
    awayTeamId: number | null;
    homeScore: number | null;
    awayScore: number | null;
    round: number | null;
};
export type FixtureMinAggregateOutputType = {
    id: number | null;
    externalId: number | null;
    championshipId: number | null;
    homeTeamId: number | null;
    awayTeamId: number | null;
    date: Date | null;
    status: $Enums.FixtureStatus | null;
    homeScore: number | null;
    awayScore: number | null;
    round: number | null;
    phase: $Enums.CupPhase | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FixtureMaxAggregateOutputType = {
    id: number | null;
    externalId: number | null;
    championshipId: number | null;
    homeTeamId: number | null;
    awayTeamId: number | null;
    date: Date | null;
    status: $Enums.FixtureStatus | null;
    homeScore: number | null;
    awayScore: number | null;
    round: number | null;
    phase: $Enums.CupPhase | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FixtureCountAggregateOutputType = {
    id: number;
    externalId: number;
    championshipId: number;
    homeTeamId: number;
    awayTeamId: number;
    date: number;
    status: number;
    homeScore: number;
    awayScore: number;
    round: number;
    phase: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FixtureAvgAggregateInputType = {
    id?: true;
    externalId?: true;
    championshipId?: true;
    homeTeamId?: true;
    awayTeamId?: true;
    homeScore?: true;
    awayScore?: true;
    round?: true;
};
export type FixtureSumAggregateInputType = {
    id?: true;
    externalId?: true;
    championshipId?: true;
    homeTeamId?: true;
    awayTeamId?: true;
    homeScore?: true;
    awayScore?: true;
    round?: true;
};
export type FixtureMinAggregateInputType = {
    id?: true;
    externalId?: true;
    championshipId?: true;
    homeTeamId?: true;
    awayTeamId?: true;
    date?: true;
    status?: true;
    homeScore?: true;
    awayScore?: true;
    round?: true;
    phase?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FixtureMaxAggregateInputType = {
    id?: true;
    externalId?: true;
    championshipId?: true;
    homeTeamId?: true;
    awayTeamId?: true;
    date?: true;
    status?: true;
    homeScore?: true;
    awayScore?: true;
    round?: true;
    phase?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FixtureCountAggregateInputType = {
    id?: true;
    externalId?: true;
    championshipId?: true;
    homeTeamId?: true;
    awayTeamId?: true;
    date?: true;
    status?: true;
    homeScore?: true;
    awayScore?: true;
    round?: true;
    phase?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FixtureAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FixtureWhereInput;
    orderBy?: Prisma.FixtureOrderByWithRelationInput | Prisma.FixtureOrderByWithRelationInput[];
    cursor?: Prisma.FixtureWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FixtureCountAggregateInputType;
    _avg?: FixtureAvgAggregateInputType;
    _sum?: FixtureSumAggregateInputType;
    _min?: FixtureMinAggregateInputType;
    _max?: FixtureMaxAggregateInputType;
};
export type GetFixtureAggregateType<T extends FixtureAggregateArgs> = {
    [P in keyof T & keyof AggregateFixture]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFixture[P]> : Prisma.GetScalarType<T[P], AggregateFixture[P]>;
};
export type FixtureGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FixtureWhereInput;
    orderBy?: Prisma.FixtureOrderByWithAggregationInput | Prisma.FixtureOrderByWithAggregationInput[];
    by: Prisma.FixtureScalarFieldEnum[] | Prisma.FixtureScalarFieldEnum;
    having?: Prisma.FixtureScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FixtureCountAggregateInputType | true;
    _avg?: FixtureAvgAggregateInputType;
    _sum?: FixtureSumAggregateInputType;
    _min?: FixtureMinAggregateInputType;
    _max?: FixtureMaxAggregateInputType;
};
export type FixtureGroupByOutputType = {
    id: number;
    externalId: number;
    championshipId: number;
    homeTeamId: number;
    awayTeamId: number;
    date: Date;
    status: $Enums.FixtureStatus;
    homeScore: number | null;
    awayScore: number | null;
    round: number | null;
    phase: $Enums.CupPhase | null;
    createdAt: Date;
    updatedAt: Date;
    _count: FixtureCountAggregateOutputType | null;
    _avg: FixtureAvgAggregateOutputType | null;
    _sum: FixtureSumAggregateOutputType | null;
    _min: FixtureMinAggregateOutputType | null;
    _max: FixtureMaxAggregateOutputType | null;
};
export type GetFixtureGroupByPayload<T extends FixtureGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FixtureGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FixtureGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FixtureGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FixtureGroupByOutputType[P]>;
}>>;
export type FixtureWhereInput = {
    AND?: Prisma.FixtureWhereInput | Prisma.FixtureWhereInput[];
    OR?: Prisma.FixtureWhereInput[];
    NOT?: Prisma.FixtureWhereInput | Prisma.FixtureWhereInput[];
    id?: Prisma.IntFilter<"Fixture"> | number;
    externalId?: Prisma.IntFilter<"Fixture"> | number;
    championshipId?: Prisma.IntFilter<"Fixture"> | number;
    homeTeamId?: Prisma.IntFilter<"Fixture"> | number;
    awayTeamId?: Prisma.IntFilter<"Fixture"> | number;
    date?: Prisma.DateTimeFilter<"Fixture"> | Date | string;
    status?: Prisma.EnumFixtureStatusFilter<"Fixture"> | $Enums.FixtureStatus;
    homeScore?: Prisma.IntNullableFilter<"Fixture"> | number | null;
    awayScore?: Prisma.IntNullableFilter<"Fixture"> | number | null;
    round?: Prisma.IntNullableFilter<"Fixture"> | number | null;
    phase?: Prisma.EnumCupPhaseNullableFilter<"Fixture"> | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFilter<"Fixture"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Fixture"> | Date | string;
    championship?: Prisma.XOR<Prisma.ChampionshipScalarRelationFilter, Prisma.ChampionshipWhereInput>;
    homeTeam?: Prisma.XOR<Prisma.TeamScalarRelationFilter, Prisma.TeamWhereInput>;
    awayTeam?: Prisma.XOR<Prisma.TeamScalarRelationFilter, Prisma.TeamWhereInput>;
    predictions?: Prisma.PredictionListRelationFilter;
    pointHistory?: Prisma.PointHistoryListRelationFilter;
};
export type FixtureOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    championshipId?: Prisma.SortOrder;
    homeTeamId?: Prisma.SortOrder;
    awayTeamId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    homeScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    awayScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    round?: Prisma.SortOrderInput | Prisma.SortOrder;
    phase?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    championship?: Prisma.ChampionshipOrderByWithRelationInput;
    homeTeam?: Prisma.TeamOrderByWithRelationInput;
    awayTeam?: Prisma.TeamOrderByWithRelationInput;
    predictions?: Prisma.PredictionOrderByRelationAggregateInput;
    pointHistory?: Prisma.PointHistoryOrderByRelationAggregateInput;
};
export type FixtureWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    externalId?: number;
    AND?: Prisma.FixtureWhereInput | Prisma.FixtureWhereInput[];
    OR?: Prisma.FixtureWhereInput[];
    NOT?: Prisma.FixtureWhereInput | Prisma.FixtureWhereInput[];
    championshipId?: Prisma.IntFilter<"Fixture"> | number;
    homeTeamId?: Prisma.IntFilter<"Fixture"> | number;
    awayTeamId?: Prisma.IntFilter<"Fixture"> | number;
    date?: Prisma.DateTimeFilter<"Fixture"> | Date | string;
    status?: Prisma.EnumFixtureStatusFilter<"Fixture"> | $Enums.FixtureStatus;
    homeScore?: Prisma.IntNullableFilter<"Fixture"> | number | null;
    awayScore?: Prisma.IntNullableFilter<"Fixture"> | number | null;
    round?: Prisma.IntNullableFilter<"Fixture"> | number | null;
    phase?: Prisma.EnumCupPhaseNullableFilter<"Fixture"> | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFilter<"Fixture"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Fixture"> | Date | string;
    championship?: Prisma.XOR<Prisma.ChampionshipScalarRelationFilter, Prisma.ChampionshipWhereInput>;
    homeTeam?: Prisma.XOR<Prisma.TeamScalarRelationFilter, Prisma.TeamWhereInput>;
    awayTeam?: Prisma.XOR<Prisma.TeamScalarRelationFilter, Prisma.TeamWhereInput>;
    predictions?: Prisma.PredictionListRelationFilter;
    pointHistory?: Prisma.PointHistoryListRelationFilter;
}, "id" | "externalId">;
export type FixtureOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    championshipId?: Prisma.SortOrder;
    homeTeamId?: Prisma.SortOrder;
    awayTeamId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    homeScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    awayScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    round?: Prisma.SortOrderInput | Prisma.SortOrder;
    phase?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FixtureCountOrderByAggregateInput;
    _avg?: Prisma.FixtureAvgOrderByAggregateInput;
    _max?: Prisma.FixtureMaxOrderByAggregateInput;
    _min?: Prisma.FixtureMinOrderByAggregateInput;
    _sum?: Prisma.FixtureSumOrderByAggregateInput;
};
export type FixtureScalarWhereWithAggregatesInput = {
    AND?: Prisma.FixtureScalarWhereWithAggregatesInput | Prisma.FixtureScalarWhereWithAggregatesInput[];
    OR?: Prisma.FixtureScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FixtureScalarWhereWithAggregatesInput | Prisma.FixtureScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Fixture"> | number;
    externalId?: Prisma.IntWithAggregatesFilter<"Fixture"> | number;
    championshipId?: Prisma.IntWithAggregatesFilter<"Fixture"> | number;
    homeTeamId?: Prisma.IntWithAggregatesFilter<"Fixture"> | number;
    awayTeamId?: Prisma.IntWithAggregatesFilter<"Fixture"> | number;
    date?: Prisma.DateTimeWithAggregatesFilter<"Fixture"> | Date | string;
    status?: Prisma.EnumFixtureStatusWithAggregatesFilter<"Fixture"> | $Enums.FixtureStatus;
    homeScore?: Prisma.IntNullableWithAggregatesFilter<"Fixture"> | number | null;
    awayScore?: Prisma.IntNullableWithAggregatesFilter<"Fixture"> | number | null;
    round?: Prisma.IntNullableWithAggregatesFilter<"Fixture"> | number | null;
    phase?: Prisma.EnumCupPhaseNullableWithAggregatesFilter<"Fixture"> | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Fixture"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Fixture"> | Date | string;
};
export type FixtureCreateInput = {
    externalId: number;
    date: Date | string;
    status?: $Enums.FixtureStatus;
    homeScore?: number | null;
    awayScore?: number | null;
    round?: number | null;
    phase?: $Enums.CupPhase | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    championship: Prisma.ChampionshipCreateNestedOneWithoutFixturesInput;
    homeTeam: Prisma.TeamCreateNestedOneWithoutHomeFixturesInput;
    awayTeam: Prisma.TeamCreateNestedOneWithoutAwayFixturesInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutFixtureInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutFixtureInput;
};
export type FixtureUncheckedCreateInput = {
    id?: number;
    externalId: number;
    championshipId: number;
    homeTeamId: number;
    awayTeamId: number;
    date: Date | string;
    status?: $Enums.FixtureStatus;
    homeScore?: number | null;
    awayScore?: number | null;
    round?: number | null;
    phase?: $Enums.CupPhase | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutFixtureInput;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutFixtureInput;
};
export type FixtureUpdateInput = {
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumFixtureStatusFieldUpdateOperationsInput | $Enums.FixtureStatus;
    homeScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    awayScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    round?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phase?: Prisma.NullableEnumCupPhaseFieldUpdateOperationsInput | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    championship?: Prisma.ChampionshipUpdateOneRequiredWithoutFixturesNestedInput;
    homeTeam?: Prisma.TeamUpdateOneRequiredWithoutHomeFixturesNestedInput;
    awayTeam?: Prisma.TeamUpdateOneRequiredWithoutAwayFixturesNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutFixtureNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutFixtureNestedInput;
};
export type FixtureUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    championshipId?: Prisma.IntFieldUpdateOperationsInput | number;
    homeTeamId?: Prisma.IntFieldUpdateOperationsInput | number;
    awayTeamId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumFixtureStatusFieldUpdateOperationsInput | $Enums.FixtureStatus;
    homeScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    awayScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    round?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phase?: Prisma.NullableEnumCupPhaseFieldUpdateOperationsInput | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutFixtureNestedInput;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutFixtureNestedInput;
};
export type FixtureCreateManyInput = {
    id?: number;
    externalId: number;
    championshipId: number;
    homeTeamId: number;
    awayTeamId: number;
    date: Date | string;
    status?: $Enums.FixtureStatus;
    homeScore?: number | null;
    awayScore?: number | null;
    round?: number | null;
    phase?: $Enums.CupPhase | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FixtureUpdateManyMutationInput = {
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumFixtureStatusFieldUpdateOperationsInput | $Enums.FixtureStatus;
    homeScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    awayScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    round?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phase?: Prisma.NullableEnumCupPhaseFieldUpdateOperationsInput | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FixtureUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    championshipId?: Prisma.IntFieldUpdateOperationsInput | number;
    homeTeamId?: Prisma.IntFieldUpdateOperationsInput | number;
    awayTeamId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumFixtureStatusFieldUpdateOperationsInput | $Enums.FixtureStatus;
    homeScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    awayScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    round?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phase?: Prisma.NullableEnumCupPhaseFieldUpdateOperationsInput | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FixtureListRelationFilter = {
    every?: Prisma.FixtureWhereInput;
    some?: Prisma.FixtureWhereInput;
    none?: Prisma.FixtureWhereInput;
};
export type FixtureOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FixtureCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    championshipId?: Prisma.SortOrder;
    homeTeamId?: Prisma.SortOrder;
    awayTeamId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    homeScore?: Prisma.SortOrder;
    awayScore?: Prisma.SortOrder;
    round?: Prisma.SortOrder;
    phase?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FixtureAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    championshipId?: Prisma.SortOrder;
    homeTeamId?: Prisma.SortOrder;
    awayTeamId?: Prisma.SortOrder;
    homeScore?: Prisma.SortOrder;
    awayScore?: Prisma.SortOrder;
    round?: Prisma.SortOrder;
};
export type FixtureMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    championshipId?: Prisma.SortOrder;
    homeTeamId?: Prisma.SortOrder;
    awayTeamId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    homeScore?: Prisma.SortOrder;
    awayScore?: Prisma.SortOrder;
    round?: Prisma.SortOrder;
    phase?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FixtureMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    championshipId?: Prisma.SortOrder;
    homeTeamId?: Prisma.SortOrder;
    awayTeamId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    homeScore?: Prisma.SortOrder;
    awayScore?: Prisma.SortOrder;
    round?: Prisma.SortOrder;
    phase?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FixtureSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    championshipId?: Prisma.SortOrder;
    homeTeamId?: Prisma.SortOrder;
    awayTeamId?: Prisma.SortOrder;
    homeScore?: Prisma.SortOrder;
    awayScore?: Prisma.SortOrder;
    round?: Prisma.SortOrder;
};
export type FixtureScalarRelationFilter = {
    is?: Prisma.FixtureWhereInput;
    isNot?: Prisma.FixtureWhereInput;
};
export type FixtureCreateNestedManyWithoutChampionshipInput = {
    create?: Prisma.XOR<Prisma.FixtureCreateWithoutChampionshipInput, Prisma.FixtureUncheckedCreateWithoutChampionshipInput> | Prisma.FixtureCreateWithoutChampionshipInput[] | Prisma.FixtureUncheckedCreateWithoutChampionshipInput[];
    connectOrCreate?: Prisma.FixtureCreateOrConnectWithoutChampionshipInput | Prisma.FixtureCreateOrConnectWithoutChampionshipInput[];
    createMany?: Prisma.FixtureCreateManyChampionshipInputEnvelope;
    connect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
};
export type FixtureUncheckedCreateNestedManyWithoutChampionshipInput = {
    create?: Prisma.XOR<Prisma.FixtureCreateWithoutChampionshipInput, Prisma.FixtureUncheckedCreateWithoutChampionshipInput> | Prisma.FixtureCreateWithoutChampionshipInput[] | Prisma.FixtureUncheckedCreateWithoutChampionshipInput[];
    connectOrCreate?: Prisma.FixtureCreateOrConnectWithoutChampionshipInput | Prisma.FixtureCreateOrConnectWithoutChampionshipInput[];
    createMany?: Prisma.FixtureCreateManyChampionshipInputEnvelope;
    connect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
};
export type FixtureUpdateManyWithoutChampionshipNestedInput = {
    create?: Prisma.XOR<Prisma.FixtureCreateWithoutChampionshipInput, Prisma.FixtureUncheckedCreateWithoutChampionshipInput> | Prisma.FixtureCreateWithoutChampionshipInput[] | Prisma.FixtureUncheckedCreateWithoutChampionshipInput[];
    connectOrCreate?: Prisma.FixtureCreateOrConnectWithoutChampionshipInput | Prisma.FixtureCreateOrConnectWithoutChampionshipInput[];
    upsert?: Prisma.FixtureUpsertWithWhereUniqueWithoutChampionshipInput | Prisma.FixtureUpsertWithWhereUniqueWithoutChampionshipInput[];
    createMany?: Prisma.FixtureCreateManyChampionshipInputEnvelope;
    set?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    disconnect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    delete?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    connect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    update?: Prisma.FixtureUpdateWithWhereUniqueWithoutChampionshipInput | Prisma.FixtureUpdateWithWhereUniqueWithoutChampionshipInput[];
    updateMany?: Prisma.FixtureUpdateManyWithWhereWithoutChampionshipInput | Prisma.FixtureUpdateManyWithWhereWithoutChampionshipInput[];
    deleteMany?: Prisma.FixtureScalarWhereInput | Prisma.FixtureScalarWhereInput[];
};
export type FixtureUncheckedUpdateManyWithoutChampionshipNestedInput = {
    create?: Prisma.XOR<Prisma.FixtureCreateWithoutChampionshipInput, Prisma.FixtureUncheckedCreateWithoutChampionshipInput> | Prisma.FixtureCreateWithoutChampionshipInput[] | Prisma.FixtureUncheckedCreateWithoutChampionshipInput[];
    connectOrCreate?: Prisma.FixtureCreateOrConnectWithoutChampionshipInput | Prisma.FixtureCreateOrConnectWithoutChampionshipInput[];
    upsert?: Prisma.FixtureUpsertWithWhereUniqueWithoutChampionshipInput | Prisma.FixtureUpsertWithWhereUniqueWithoutChampionshipInput[];
    createMany?: Prisma.FixtureCreateManyChampionshipInputEnvelope;
    set?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    disconnect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    delete?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    connect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    update?: Prisma.FixtureUpdateWithWhereUniqueWithoutChampionshipInput | Prisma.FixtureUpdateWithWhereUniqueWithoutChampionshipInput[];
    updateMany?: Prisma.FixtureUpdateManyWithWhereWithoutChampionshipInput | Prisma.FixtureUpdateManyWithWhereWithoutChampionshipInput[];
    deleteMany?: Prisma.FixtureScalarWhereInput | Prisma.FixtureScalarWhereInput[];
};
export type FixtureCreateNestedManyWithoutHomeTeamInput = {
    create?: Prisma.XOR<Prisma.FixtureCreateWithoutHomeTeamInput, Prisma.FixtureUncheckedCreateWithoutHomeTeamInput> | Prisma.FixtureCreateWithoutHomeTeamInput[] | Prisma.FixtureUncheckedCreateWithoutHomeTeamInput[];
    connectOrCreate?: Prisma.FixtureCreateOrConnectWithoutHomeTeamInput | Prisma.FixtureCreateOrConnectWithoutHomeTeamInput[];
    createMany?: Prisma.FixtureCreateManyHomeTeamInputEnvelope;
    connect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
};
export type FixtureCreateNestedManyWithoutAwayTeamInput = {
    create?: Prisma.XOR<Prisma.FixtureCreateWithoutAwayTeamInput, Prisma.FixtureUncheckedCreateWithoutAwayTeamInput> | Prisma.FixtureCreateWithoutAwayTeamInput[] | Prisma.FixtureUncheckedCreateWithoutAwayTeamInput[];
    connectOrCreate?: Prisma.FixtureCreateOrConnectWithoutAwayTeamInput | Prisma.FixtureCreateOrConnectWithoutAwayTeamInput[];
    createMany?: Prisma.FixtureCreateManyAwayTeamInputEnvelope;
    connect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
};
export type FixtureUncheckedCreateNestedManyWithoutHomeTeamInput = {
    create?: Prisma.XOR<Prisma.FixtureCreateWithoutHomeTeamInput, Prisma.FixtureUncheckedCreateWithoutHomeTeamInput> | Prisma.FixtureCreateWithoutHomeTeamInput[] | Prisma.FixtureUncheckedCreateWithoutHomeTeamInput[];
    connectOrCreate?: Prisma.FixtureCreateOrConnectWithoutHomeTeamInput | Prisma.FixtureCreateOrConnectWithoutHomeTeamInput[];
    createMany?: Prisma.FixtureCreateManyHomeTeamInputEnvelope;
    connect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
};
export type FixtureUncheckedCreateNestedManyWithoutAwayTeamInput = {
    create?: Prisma.XOR<Prisma.FixtureCreateWithoutAwayTeamInput, Prisma.FixtureUncheckedCreateWithoutAwayTeamInput> | Prisma.FixtureCreateWithoutAwayTeamInput[] | Prisma.FixtureUncheckedCreateWithoutAwayTeamInput[];
    connectOrCreate?: Prisma.FixtureCreateOrConnectWithoutAwayTeamInput | Prisma.FixtureCreateOrConnectWithoutAwayTeamInput[];
    createMany?: Prisma.FixtureCreateManyAwayTeamInputEnvelope;
    connect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
};
export type FixtureUpdateManyWithoutHomeTeamNestedInput = {
    create?: Prisma.XOR<Prisma.FixtureCreateWithoutHomeTeamInput, Prisma.FixtureUncheckedCreateWithoutHomeTeamInput> | Prisma.FixtureCreateWithoutHomeTeamInput[] | Prisma.FixtureUncheckedCreateWithoutHomeTeamInput[];
    connectOrCreate?: Prisma.FixtureCreateOrConnectWithoutHomeTeamInput | Prisma.FixtureCreateOrConnectWithoutHomeTeamInput[];
    upsert?: Prisma.FixtureUpsertWithWhereUniqueWithoutHomeTeamInput | Prisma.FixtureUpsertWithWhereUniqueWithoutHomeTeamInput[];
    createMany?: Prisma.FixtureCreateManyHomeTeamInputEnvelope;
    set?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    disconnect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    delete?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    connect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    update?: Prisma.FixtureUpdateWithWhereUniqueWithoutHomeTeamInput | Prisma.FixtureUpdateWithWhereUniqueWithoutHomeTeamInput[];
    updateMany?: Prisma.FixtureUpdateManyWithWhereWithoutHomeTeamInput | Prisma.FixtureUpdateManyWithWhereWithoutHomeTeamInput[];
    deleteMany?: Prisma.FixtureScalarWhereInput | Prisma.FixtureScalarWhereInput[];
};
export type FixtureUpdateManyWithoutAwayTeamNestedInput = {
    create?: Prisma.XOR<Prisma.FixtureCreateWithoutAwayTeamInput, Prisma.FixtureUncheckedCreateWithoutAwayTeamInput> | Prisma.FixtureCreateWithoutAwayTeamInput[] | Prisma.FixtureUncheckedCreateWithoutAwayTeamInput[];
    connectOrCreate?: Prisma.FixtureCreateOrConnectWithoutAwayTeamInput | Prisma.FixtureCreateOrConnectWithoutAwayTeamInput[];
    upsert?: Prisma.FixtureUpsertWithWhereUniqueWithoutAwayTeamInput | Prisma.FixtureUpsertWithWhereUniqueWithoutAwayTeamInput[];
    createMany?: Prisma.FixtureCreateManyAwayTeamInputEnvelope;
    set?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    disconnect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    delete?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    connect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    update?: Prisma.FixtureUpdateWithWhereUniqueWithoutAwayTeamInput | Prisma.FixtureUpdateWithWhereUniqueWithoutAwayTeamInput[];
    updateMany?: Prisma.FixtureUpdateManyWithWhereWithoutAwayTeamInput | Prisma.FixtureUpdateManyWithWhereWithoutAwayTeamInput[];
    deleteMany?: Prisma.FixtureScalarWhereInput | Prisma.FixtureScalarWhereInput[];
};
export type FixtureUncheckedUpdateManyWithoutHomeTeamNestedInput = {
    create?: Prisma.XOR<Prisma.FixtureCreateWithoutHomeTeamInput, Prisma.FixtureUncheckedCreateWithoutHomeTeamInput> | Prisma.FixtureCreateWithoutHomeTeamInput[] | Prisma.FixtureUncheckedCreateWithoutHomeTeamInput[];
    connectOrCreate?: Prisma.FixtureCreateOrConnectWithoutHomeTeamInput | Prisma.FixtureCreateOrConnectWithoutHomeTeamInput[];
    upsert?: Prisma.FixtureUpsertWithWhereUniqueWithoutHomeTeamInput | Prisma.FixtureUpsertWithWhereUniqueWithoutHomeTeamInput[];
    createMany?: Prisma.FixtureCreateManyHomeTeamInputEnvelope;
    set?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    disconnect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    delete?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    connect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    update?: Prisma.FixtureUpdateWithWhereUniqueWithoutHomeTeamInput | Prisma.FixtureUpdateWithWhereUniqueWithoutHomeTeamInput[];
    updateMany?: Prisma.FixtureUpdateManyWithWhereWithoutHomeTeamInput | Prisma.FixtureUpdateManyWithWhereWithoutHomeTeamInput[];
    deleteMany?: Prisma.FixtureScalarWhereInput | Prisma.FixtureScalarWhereInput[];
};
export type FixtureUncheckedUpdateManyWithoutAwayTeamNestedInput = {
    create?: Prisma.XOR<Prisma.FixtureCreateWithoutAwayTeamInput, Prisma.FixtureUncheckedCreateWithoutAwayTeamInput> | Prisma.FixtureCreateWithoutAwayTeamInput[] | Prisma.FixtureUncheckedCreateWithoutAwayTeamInput[];
    connectOrCreate?: Prisma.FixtureCreateOrConnectWithoutAwayTeamInput | Prisma.FixtureCreateOrConnectWithoutAwayTeamInput[];
    upsert?: Prisma.FixtureUpsertWithWhereUniqueWithoutAwayTeamInput | Prisma.FixtureUpsertWithWhereUniqueWithoutAwayTeamInput[];
    createMany?: Prisma.FixtureCreateManyAwayTeamInputEnvelope;
    set?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    disconnect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    delete?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    connect?: Prisma.FixtureWhereUniqueInput | Prisma.FixtureWhereUniqueInput[];
    update?: Prisma.FixtureUpdateWithWhereUniqueWithoutAwayTeamInput | Prisma.FixtureUpdateWithWhereUniqueWithoutAwayTeamInput[];
    updateMany?: Prisma.FixtureUpdateManyWithWhereWithoutAwayTeamInput | Prisma.FixtureUpdateManyWithWhereWithoutAwayTeamInput[];
    deleteMany?: Prisma.FixtureScalarWhereInput | Prisma.FixtureScalarWhereInput[];
};
export type EnumFixtureStatusFieldUpdateOperationsInput = {
    set?: $Enums.FixtureStatus;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableEnumCupPhaseFieldUpdateOperationsInput = {
    set?: $Enums.CupPhase | null;
};
export type FixtureCreateNestedOneWithoutPredictionsInput = {
    create?: Prisma.XOR<Prisma.FixtureCreateWithoutPredictionsInput, Prisma.FixtureUncheckedCreateWithoutPredictionsInput>;
    connectOrCreate?: Prisma.FixtureCreateOrConnectWithoutPredictionsInput;
    connect?: Prisma.FixtureWhereUniqueInput;
};
export type FixtureUpdateOneRequiredWithoutPredictionsNestedInput = {
    create?: Prisma.XOR<Prisma.FixtureCreateWithoutPredictionsInput, Prisma.FixtureUncheckedCreateWithoutPredictionsInput>;
    connectOrCreate?: Prisma.FixtureCreateOrConnectWithoutPredictionsInput;
    upsert?: Prisma.FixtureUpsertWithoutPredictionsInput;
    connect?: Prisma.FixtureWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FixtureUpdateToOneWithWhereWithoutPredictionsInput, Prisma.FixtureUpdateWithoutPredictionsInput>, Prisma.FixtureUncheckedUpdateWithoutPredictionsInput>;
};
export type FixtureCreateNestedOneWithoutPointHistoryInput = {
    create?: Prisma.XOR<Prisma.FixtureCreateWithoutPointHistoryInput, Prisma.FixtureUncheckedCreateWithoutPointHistoryInput>;
    connectOrCreate?: Prisma.FixtureCreateOrConnectWithoutPointHistoryInput;
    connect?: Prisma.FixtureWhereUniqueInput;
};
export type FixtureUpdateOneRequiredWithoutPointHistoryNestedInput = {
    create?: Prisma.XOR<Prisma.FixtureCreateWithoutPointHistoryInput, Prisma.FixtureUncheckedCreateWithoutPointHistoryInput>;
    connectOrCreate?: Prisma.FixtureCreateOrConnectWithoutPointHistoryInput;
    upsert?: Prisma.FixtureUpsertWithoutPointHistoryInput;
    connect?: Prisma.FixtureWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FixtureUpdateToOneWithWhereWithoutPointHistoryInput, Prisma.FixtureUpdateWithoutPointHistoryInput>, Prisma.FixtureUncheckedUpdateWithoutPointHistoryInput>;
};
export type FixtureCreateWithoutChampionshipInput = {
    externalId: number;
    date: Date | string;
    status?: $Enums.FixtureStatus;
    homeScore?: number | null;
    awayScore?: number | null;
    round?: number | null;
    phase?: $Enums.CupPhase | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    homeTeam: Prisma.TeamCreateNestedOneWithoutHomeFixturesInput;
    awayTeam: Prisma.TeamCreateNestedOneWithoutAwayFixturesInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutFixtureInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutFixtureInput;
};
export type FixtureUncheckedCreateWithoutChampionshipInput = {
    id?: number;
    externalId: number;
    homeTeamId: number;
    awayTeamId: number;
    date: Date | string;
    status?: $Enums.FixtureStatus;
    homeScore?: number | null;
    awayScore?: number | null;
    round?: number | null;
    phase?: $Enums.CupPhase | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutFixtureInput;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutFixtureInput;
};
export type FixtureCreateOrConnectWithoutChampionshipInput = {
    where: Prisma.FixtureWhereUniqueInput;
    create: Prisma.XOR<Prisma.FixtureCreateWithoutChampionshipInput, Prisma.FixtureUncheckedCreateWithoutChampionshipInput>;
};
export type FixtureCreateManyChampionshipInputEnvelope = {
    data: Prisma.FixtureCreateManyChampionshipInput | Prisma.FixtureCreateManyChampionshipInput[];
    skipDuplicates?: boolean;
};
export type FixtureUpsertWithWhereUniqueWithoutChampionshipInput = {
    where: Prisma.FixtureWhereUniqueInput;
    update: Prisma.XOR<Prisma.FixtureUpdateWithoutChampionshipInput, Prisma.FixtureUncheckedUpdateWithoutChampionshipInput>;
    create: Prisma.XOR<Prisma.FixtureCreateWithoutChampionshipInput, Prisma.FixtureUncheckedCreateWithoutChampionshipInput>;
};
export type FixtureUpdateWithWhereUniqueWithoutChampionshipInput = {
    where: Prisma.FixtureWhereUniqueInput;
    data: Prisma.XOR<Prisma.FixtureUpdateWithoutChampionshipInput, Prisma.FixtureUncheckedUpdateWithoutChampionshipInput>;
};
export type FixtureUpdateManyWithWhereWithoutChampionshipInput = {
    where: Prisma.FixtureScalarWhereInput;
    data: Prisma.XOR<Prisma.FixtureUpdateManyMutationInput, Prisma.FixtureUncheckedUpdateManyWithoutChampionshipInput>;
};
export type FixtureScalarWhereInput = {
    AND?: Prisma.FixtureScalarWhereInput | Prisma.FixtureScalarWhereInput[];
    OR?: Prisma.FixtureScalarWhereInput[];
    NOT?: Prisma.FixtureScalarWhereInput | Prisma.FixtureScalarWhereInput[];
    id?: Prisma.IntFilter<"Fixture"> | number;
    externalId?: Prisma.IntFilter<"Fixture"> | number;
    championshipId?: Prisma.IntFilter<"Fixture"> | number;
    homeTeamId?: Prisma.IntFilter<"Fixture"> | number;
    awayTeamId?: Prisma.IntFilter<"Fixture"> | number;
    date?: Prisma.DateTimeFilter<"Fixture"> | Date | string;
    status?: Prisma.EnumFixtureStatusFilter<"Fixture"> | $Enums.FixtureStatus;
    homeScore?: Prisma.IntNullableFilter<"Fixture"> | number | null;
    awayScore?: Prisma.IntNullableFilter<"Fixture"> | number | null;
    round?: Prisma.IntNullableFilter<"Fixture"> | number | null;
    phase?: Prisma.EnumCupPhaseNullableFilter<"Fixture"> | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFilter<"Fixture"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Fixture"> | Date | string;
};
export type FixtureCreateWithoutHomeTeamInput = {
    externalId: number;
    date: Date | string;
    status?: $Enums.FixtureStatus;
    homeScore?: number | null;
    awayScore?: number | null;
    round?: number | null;
    phase?: $Enums.CupPhase | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    championship: Prisma.ChampionshipCreateNestedOneWithoutFixturesInput;
    awayTeam: Prisma.TeamCreateNestedOneWithoutAwayFixturesInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutFixtureInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutFixtureInput;
};
export type FixtureUncheckedCreateWithoutHomeTeamInput = {
    id?: number;
    externalId: number;
    championshipId: number;
    awayTeamId: number;
    date: Date | string;
    status?: $Enums.FixtureStatus;
    homeScore?: number | null;
    awayScore?: number | null;
    round?: number | null;
    phase?: $Enums.CupPhase | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutFixtureInput;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutFixtureInput;
};
export type FixtureCreateOrConnectWithoutHomeTeamInput = {
    where: Prisma.FixtureWhereUniqueInput;
    create: Prisma.XOR<Prisma.FixtureCreateWithoutHomeTeamInput, Prisma.FixtureUncheckedCreateWithoutHomeTeamInput>;
};
export type FixtureCreateManyHomeTeamInputEnvelope = {
    data: Prisma.FixtureCreateManyHomeTeamInput | Prisma.FixtureCreateManyHomeTeamInput[];
    skipDuplicates?: boolean;
};
export type FixtureCreateWithoutAwayTeamInput = {
    externalId: number;
    date: Date | string;
    status?: $Enums.FixtureStatus;
    homeScore?: number | null;
    awayScore?: number | null;
    round?: number | null;
    phase?: $Enums.CupPhase | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    championship: Prisma.ChampionshipCreateNestedOneWithoutFixturesInput;
    homeTeam: Prisma.TeamCreateNestedOneWithoutHomeFixturesInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutFixtureInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutFixtureInput;
};
export type FixtureUncheckedCreateWithoutAwayTeamInput = {
    id?: number;
    externalId: number;
    championshipId: number;
    homeTeamId: number;
    date: Date | string;
    status?: $Enums.FixtureStatus;
    homeScore?: number | null;
    awayScore?: number | null;
    round?: number | null;
    phase?: $Enums.CupPhase | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutFixtureInput;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutFixtureInput;
};
export type FixtureCreateOrConnectWithoutAwayTeamInput = {
    where: Prisma.FixtureWhereUniqueInput;
    create: Prisma.XOR<Prisma.FixtureCreateWithoutAwayTeamInput, Prisma.FixtureUncheckedCreateWithoutAwayTeamInput>;
};
export type FixtureCreateManyAwayTeamInputEnvelope = {
    data: Prisma.FixtureCreateManyAwayTeamInput | Prisma.FixtureCreateManyAwayTeamInput[];
    skipDuplicates?: boolean;
};
export type FixtureUpsertWithWhereUniqueWithoutHomeTeamInput = {
    where: Prisma.FixtureWhereUniqueInput;
    update: Prisma.XOR<Prisma.FixtureUpdateWithoutHomeTeamInput, Prisma.FixtureUncheckedUpdateWithoutHomeTeamInput>;
    create: Prisma.XOR<Prisma.FixtureCreateWithoutHomeTeamInput, Prisma.FixtureUncheckedCreateWithoutHomeTeamInput>;
};
export type FixtureUpdateWithWhereUniqueWithoutHomeTeamInput = {
    where: Prisma.FixtureWhereUniqueInput;
    data: Prisma.XOR<Prisma.FixtureUpdateWithoutHomeTeamInput, Prisma.FixtureUncheckedUpdateWithoutHomeTeamInput>;
};
export type FixtureUpdateManyWithWhereWithoutHomeTeamInput = {
    where: Prisma.FixtureScalarWhereInput;
    data: Prisma.XOR<Prisma.FixtureUpdateManyMutationInput, Prisma.FixtureUncheckedUpdateManyWithoutHomeTeamInput>;
};
export type FixtureUpsertWithWhereUniqueWithoutAwayTeamInput = {
    where: Prisma.FixtureWhereUniqueInput;
    update: Prisma.XOR<Prisma.FixtureUpdateWithoutAwayTeamInput, Prisma.FixtureUncheckedUpdateWithoutAwayTeamInput>;
    create: Prisma.XOR<Prisma.FixtureCreateWithoutAwayTeamInput, Prisma.FixtureUncheckedCreateWithoutAwayTeamInput>;
};
export type FixtureUpdateWithWhereUniqueWithoutAwayTeamInput = {
    where: Prisma.FixtureWhereUniqueInput;
    data: Prisma.XOR<Prisma.FixtureUpdateWithoutAwayTeamInput, Prisma.FixtureUncheckedUpdateWithoutAwayTeamInput>;
};
export type FixtureUpdateManyWithWhereWithoutAwayTeamInput = {
    where: Prisma.FixtureScalarWhereInput;
    data: Prisma.XOR<Prisma.FixtureUpdateManyMutationInput, Prisma.FixtureUncheckedUpdateManyWithoutAwayTeamInput>;
};
export type FixtureCreateWithoutPredictionsInput = {
    externalId: number;
    date: Date | string;
    status?: $Enums.FixtureStatus;
    homeScore?: number | null;
    awayScore?: number | null;
    round?: number | null;
    phase?: $Enums.CupPhase | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    championship: Prisma.ChampionshipCreateNestedOneWithoutFixturesInput;
    homeTeam: Prisma.TeamCreateNestedOneWithoutHomeFixturesInput;
    awayTeam: Prisma.TeamCreateNestedOneWithoutAwayFixturesInput;
    pointHistory?: Prisma.PointHistoryCreateNestedManyWithoutFixtureInput;
};
export type FixtureUncheckedCreateWithoutPredictionsInput = {
    id?: number;
    externalId: number;
    championshipId: number;
    homeTeamId: number;
    awayTeamId: number;
    date: Date | string;
    status?: $Enums.FixtureStatus;
    homeScore?: number | null;
    awayScore?: number | null;
    round?: number | null;
    phase?: $Enums.CupPhase | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointHistory?: Prisma.PointHistoryUncheckedCreateNestedManyWithoutFixtureInput;
};
export type FixtureCreateOrConnectWithoutPredictionsInput = {
    where: Prisma.FixtureWhereUniqueInput;
    create: Prisma.XOR<Prisma.FixtureCreateWithoutPredictionsInput, Prisma.FixtureUncheckedCreateWithoutPredictionsInput>;
};
export type FixtureUpsertWithoutPredictionsInput = {
    update: Prisma.XOR<Prisma.FixtureUpdateWithoutPredictionsInput, Prisma.FixtureUncheckedUpdateWithoutPredictionsInput>;
    create: Prisma.XOR<Prisma.FixtureCreateWithoutPredictionsInput, Prisma.FixtureUncheckedCreateWithoutPredictionsInput>;
    where?: Prisma.FixtureWhereInput;
};
export type FixtureUpdateToOneWithWhereWithoutPredictionsInput = {
    where?: Prisma.FixtureWhereInput;
    data: Prisma.XOR<Prisma.FixtureUpdateWithoutPredictionsInput, Prisma.FixtureUncheckedUpdateWithoutPredictionsInput>;
};
export type FixtureUpdateWithoutPredictionsInput = {
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumFixtureStatusFieldUpdateOperationsInput | $Enums.FixtureStatus;
    homeScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    awayScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    round?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phase?: Prisma.NullableEnumCupPhaseFieldUpdateOperationsInput | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    championship?: Prisma.ChampionshipUpdateOneRequiredWithoutFixturesNestedInput;
    homeTeam?: Prisma.TeamUpdateOneRequiredWithoutHomeFixturesNestedInput;
    awayTeam?: Prisma.TeamUpdateOneRequiredWithoutAwayFixturesNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutFixtureNestedInput;
};
export type FixtureUncheckedUpdateWithoutPredictionsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    championshipId?: Prisma.IntFieldUpdateOperationsInput | number;
    homeTeamId?: Prisma.IntFieldUpdateOperationsInput | number;
    awayTeamId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumFixtureStatusFieldUpdateOperationsInput | $Enums.FixtureStatus;
    homeScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    awayScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    round?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phase?: Prisma.NullableEnumCupPhaseFieldUpdateOperationsInput | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutFixtureNestedInput;
};
export type FixtureCreateWithoutPointHistoryInput = {
    externalId: number;
    date: Date | string;
    status?: $Enums.FixtureStatus;
    homeScore?: number | null;
    awayScore?: number | null;
    round?: number | null;
    phase?: $Enums.CupPhase | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    championship: Prisma.ChampionshipCreateNestedOneWithoutFixturesInput;
    homeTeam: Prisma.TeamCreateNestedOneWithoutHomeFixturesInput;
    awayTeam: Prisma.TeamCreateNestedOneWithoutAwayFixturesInput;
    predictions?: Prisma.PredictionCreateNestedManyWithoutFixtureInput;
};
export type FixtureUncheckedCreateWithoutPointHistoryInput = {
    id?: number;
    externalId: number;
    championshipId: number;
    homeTeamId: number;
    awayTeamId: number;
    date: Date | string;
    status?: $Enums.FixtureStatus;
    homeScore?: number | null;
    awayScore?: number | null;
    round?: number | null;
    phase?: $Enums.CupPhase | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    predictions?: Prisma.PredictionUncheckedCreateNestedManyWithoutFixtureInput;
};
export type FixtureCreateOrConnectWithoutPointHistoryInput = {
    where: Prisma.FixtureWhereUniqueInput;
    create: Prisma.XOR<Prisma.FixtureCreateWithoutPointHistoryInput, Prisma.FixtureUncheckedCreateWithoutPointHistoryInput>;
};
export type FixtureUpsertWithoutPointHistoryInput = {
    update: Prisma.XOR<Prisma.FixtureUpdateWithoutPointHistoryInput, Prisma.FixtureUncheckedUpdateWithoutPointHistoryInput>;
    create: Prisma.XOR<Prisma.FixtureCreateWithoutPointHistoryInput, Prisma.FixtureUncheckedCreateWithoutPointHistoryInput>;
    where?: Prisma.FixtureWhereInput;
};
export type FixtureUpdateToOneWithWhereWithoutPointHistoryInput = {
    where?: Prisma.FixtureWhereInput;
    data: Prisma.XOR<Prisma.FixtureUpdateWithoutPointHistoryInput, Prisma.FixtureUncheckedUpdateWithoutPointHistoryInput>;
};
export type FixtureUpdateWithoutPointHistoryInput = {
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumFixtureStatusFieldUpdateOperationsInput | $Enums.FixtureStatus;
    homeScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    awayScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    round?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phase?: Prisma.NullableEnumCupPhaseFieldUpdateOperationsInput | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    championship?: Prisma.ChampionshipUpdateOneRequiredWithoutFixturesNestedInput;
    homeTeam?: Prisma.TeamUpdateOneRequiredWithoutHomeFixturesNestedInput;
    awayTeam?: Prisma.TeamUpdateOneRequiredWithoutAwayFixturesNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutFixtureNestedInput;
};
export type FixtureUncheckedUpdateWithoutPointHistoryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    championshipId?: Prisma.IntFieldUpdateOperationsInput | number;
    homeTeamId?: Prisma.IntFieldUpdateOperationsInput | number;
    awayTeamId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumFixtureStatusFieldUpdateOperationsInput | $Enums.FixtureStatus;
    homeScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    awayScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    round?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phase?: Prisma.NullableEnumCupPhaseFieldUpdateOperationsInput | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutFixtureNestedInput;
};
export type FixtureCreateManyChampionshipInput = {
    id?: number;
    externalId: number;
    homeTeamId: number;
    awayTeamId: number;
    date: Date | string;
    status?: $Enums.FixtureStatus;
    homeScore?: number | null;
    awayScore?: number | null;
    round?: number | null;
    phase?: $Enums.CupPhase | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FixtureUpdateWithoutChampionshipInput = {
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumFixtureStatusFieldUpdateOperationsInput | $Enums.FixtureStatus;
    homeScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    awayScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    round?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phase?: Prisma.NullableEnumCupPhaseFieldUpdateOperationsInput | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    homeTeam?: Prisma.TeamUpdateOneRequiredWithoutHomeFixturesNestedInput;
    awayTeam?: Prisma.TeamUpdateOneRequiredWithoutAwayFixturesNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutFixtureNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutFixtureNestedInput;
};
export type FixtureUncheckedUpdateWithoutChampionshipInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    homeTeamId?: Prisma.IntFieldUpdateOperationsInput | number;
    awayTeamId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumFixtureStatusFieldUpdateOperationsInput | $Enums.FixtureStatus;
    homeScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    awayScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    round?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phase?: Prisma.NullableEnumCupPhaseFieldUpdateOperationsInput | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutFixtureNestedInput;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutFixtureNestedInput;
};
export type FixtureUncheckedUpdateManyWithoutChampionshipInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    homeTeamId?: Prisma.IntFieldUpdateOperationsInput | number;
    awayTeamId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumFixtureStatusFieldUpdateOperationsInput | $Enums.FixtureStatus;
    homeScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    awayScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    round?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phase?: Prisma.NullableEnumCupPhaseFieldUpdateOperationsInput | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FixtureCreateManyHomeTeamInput = {
    id?: number;
    externalId: number;
    championshipId: number;
    awayTeamId: number;
    date: Date | string;
    status?: $Enums.FixtureStatus;
    homeScore?: number | null;
    awayScore?: number | null;
    round?: number | null;
    phase?: $Enums.CupPhase | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FixtureCreateManyAwayTeamInput = {
    id?: number;
    externalId: number;
    championshipId: number;
    homeTeamId: number;
    date: Date | string;
    status?: $Enums.FixtureStatus;
    homeScore?: number | null;
    awayScore?: number | null;
    round?: number | null;
    phase?: $Enums.CupPhase | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FixtureUpdateWithoutHomeTeamInput = {
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumFixtureStatusFieldUpdateOperationsInput | $Enums.FixtureStatus;
    homeScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    awayScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    round?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phase?: Prisma.NullableEnumCupPhaseFieldUpdateOperationsInput | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    championship?: Prisma.ChampionshipUpdateOneRequiredWithoutFixturesNestedInput;
    awayTeam?: Prisma.TeamUpdateOneRequiredWithoutAwayFixturesNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutFixtureNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutFixtureNestedInput;
};
export type FixtureUncheckedUpdateWithoutHomeTeamInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    championshipId?: Prisma.IntFieldUpdateOperationsInput | number;
    awayTeamId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumFixtureStatusFieldUpdateOperationsInput | $Enums.FixtureStatus;
    homeScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    awayScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    round?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phase?: Prisma.NullableEnumCupPhaseFieldUpdateOperationsInput | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutFixtureNestedInput;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutFixtureNestedInput;
};
export type FixtureUncheckedUpdateManyWithoutHomeTeamInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    championshipId?: Prisma.IntFieldUpdateOperationsInput | number;
    awayTeamId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumFixtureStatusFieldUpdateOperationsInput | $Enums.FixtureStatus;
    homeScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    awayScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    round?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phase?: Prisma.NullableEnumCupPhaseFieldUpdateOperationsInput | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FixtureUpdateWithoutAwayTeamInput = {
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumFixtureStatusFieldUpdateOperationsInput | $Enums.FixtureStatus;
    homeScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    awayScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    round?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phase?: Prisma.NullableEnumCupPhaseFieldUpdateOperationsInput | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    championship?: Prisma.ChampionshipUpdateOneRequiredWithoutFixturesNestedInput;
    homeTeam?: Prisma.TeamUpdateOneRequiredWithoutHomeFixturesNestedInput;
    predictions?: Prisma.PredictionUpdateManyWithoutFixtureNestedInput;
    pointHistory?: Prisma.PointHistoryUpdateManyWithoutFixtureNestedInput;
};
export type FixtureUncheckedUpdateWithoutAwayTeamInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    championshipId?: Prisma.IntFieldUpdateOperationsInput | number;
    homeTeamId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumFixtureStatusFieldUpdateOperationsInput | $Enums.FixtureStatus;
    homeScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    awayScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    round?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phase?: Prisma.NullableEnumCupPhaseFieldUpdateOperationsInput | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    predictions?: Prisma.PredictionUncheckedUpdateManyWithoutFixtureNestedInput;
    pointHistory?: Prisma.PointHistoryUncheckedUpdateManyWithoutFixtureNestedInput;
};
export type FixtureUncheckedUpdateManyWithoutAwayTeamInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    championshipId?: Prisma.IntFieldUpdateOperationsInput | number;
    homeTeamId?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumFixtureStatusFieldUpdateOperationsInput | $Enums.FixtureStatus;
    homeScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    awayScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    round?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phase?: Prisma.NullableEnumCupPhaseFieldUpdateOperationsInput | $Enums.CupPhase | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FixtureCountOutputType = {
    predictions: number;
    pointHistory: number;
};
export type FixtureCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    predictions?: boolean | FixtureCountOutputTypeCountPredictionsArgs;
    pointHistory?: boolean | FixtureCountOutputTypeCountPointHistoryArgs;
};
export type FixtureCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FixtureCountOutputTypeSelect<ExtArgs> | null;
};
export type FixtureCountOutputTypeCountPredictionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PredictionWhereInput;
};
export type FixtureCountOutputTypeCountPointHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PointHistoryWhereInput;
};
export type FixtureSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    externalId?: boolean;
    championshipId?: boolean;
    homeTeamId?: boolean;
    awayTeamId?: boolean;
    date?: boolean;
    status?: boolean;
    homeScore?: boolean;
    awayScore?: boolean;
    round?: boolean;
    phase?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    championship?: boolean | Prisma.ChampionshipDefaultArgs<ExtArgs>;
    homeTeam?: boolean | Prisma.TeamDefaultArgs<ExtArgs>;
    awayTeam?: boolean | Prisma.TeamDefaultArgs<ExtArgs>;
    predictions?: boolean | Prisma.Fixture$predictionsArgs<ExtArgs>;
    pointHistory?: boolean | Prisma.Fixture$pointHistoryArgs<ExtArgs>;
    _count?: boolean | Prisma.FixtureCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fixture"]>;
export type FixtureSelectScalar = {
    id?: boolean;
    externalId?: boolean;
    championshipId?: boolean;
    homeTeamId?: boolean;
    awayTeamId?: boolean;
    date?: boolean;
    status?: boolean;
    homeScore?: boolean;
    awayScore?: boolean;
    round?: boolean;
    phase?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FixtureOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "externalId" | "championshipId" | "homeTeamId" | "awayTeamId" | "date" | "status" | "homeScore" | "awayScore" | "round" | "phase" | "createdAt" | "updatedAt", ExtArgs["result"]["fixture"]>;
export type FixtureInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    championship?: boolean | Prisma.ChampionshipDefaultArgs<ExtArgs>;
    homeTeam?: boolean | Prisma.TeamDefaultArgs<ExtArgs>;
    awayTeam?: boolean | Prisma.TeamDefaultArgs<ExtArgs>;
    predictions?: boolean | Prisma.Fixture$predictionsArgs<ExtArgs>;
    pointHistory?: boolean | Prisma.Fixture$pointHistoryArgs<ExtArgs>;
    _count?: boolean | Prisma.FixtureCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $FixturePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Fixture";
    objects: {
        championship: Prisma.$ChampionshipPayload<ExtArgs>;
        homeTeam: Prisma.$TeamPayload<ExtArgs>;
        awayTeam: Prisma.$TeamPayload<ExtArgs>;
        predictions: Prisma.$PredictionPayload<ExtArgs>[];
        pointHistory: Prisma.$PointHistoryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        externalId: number;
        championshipId: number;
        homeTeamId: number;
        awayTeamId: number;
        date: Date;
        status: $Enums.FixtureStatus;
        homeScore: number | null;
        awayScore: number | null;
        round: number | null;
        phase: $Enums.CupPhase | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["fixture"]>;
    composites: {};
};
export type FixtureGetPayload<S extends boolean | null | undefined | FixtureDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FixturePayload, S>;
export type FixtureCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FixtureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FixtureCountAggregateInputType | true;
};
export interface FixtureDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Fixture'];
        meta: {
            name: 'Fixture';
        };
    };
    findUnique<T extends FixtureFindUniqueArgs>(args: Prisma.SelectSubset<T, FixtureFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FixtureClient<runtime.Types.Result.GetResult<Prisma.$FixturePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FixtureFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FixtureFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FixtureClient<runtime.Types.Result.GetResult<Prisma.$FixturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FixtureFindFirstArgs>(args?: Prisma.SelectSubset<T, FixtureFindFirstArgs<ExtArgs>>): Prisma.Prisma__FixtureClient<runtime.Types.Result.GetResult<Prisma.$FixturePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FixtureFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FixtureFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FixtureClient<runtime.Types.Result.GetResult<Prisma.$FixturePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FixtureFindManyArgs>(args?: Prisma.SelectSubset<T, FixtureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FixturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FixtureCreateArgs>(args: Prisma.SelectSubset<T, FixtureCreateArgs<ExtArgs>>): Prisma.Prisma__FixtureClient<runtime.Types.Result.GetResult<Prisma.$FixturePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FixtureCreateManyArgs>(args?: Prisma.SelectSubset<T, FixtureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends FixtureDeleteArgs>(args: Prisma.SelectSubset<T, FixtureDeleteArgs<ExtArgs>>): Prisma.Prisma__FixtureClient<runtime.Types.Result.GetResult<Prisma.$FixturePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FixtureUpdateArgs>(args: Prisma.SelectSubset<T, FixtureUpdateArgs<ExtArgs>>): Prisma.Prisma__FixtureClient<runtime.Types.Result.GetResult<Prisma.$FixturePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FixtureDeleteManyArgs>(args?: Prisma.SelectSubset<T, FixtureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FixtureUpdateManyArgs>(args: Prisma.SelectSubset<T, FixtureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends FixtureUpsertArgs>(args: Prisma.SelectSubset<T, FixtureUpsertArgs<ExtArgs>>): Prisma.Prisma__FixtureClient<runtime.Types.Result.GetResult<Prisma.$FixturePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FixtureCountArgs>(args?: Prisma.Subset<T, FixtureCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FixtureCountAggregateOutputType> : number>;
    aggregate<T extends FixtureAggregateArgs>(args: Prisma.Subset<T, FixtureAggregateArgs>): Prisma.PrismaPromise<GetFixtureAggregateType<T>>;
    groupBy<T extends FixtureGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FixtureGroupByArgs['orderBy'];
    } : {
        orderBy?: FixtureGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FixtureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFixtureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FixtureFieldRefs;
}
export interface Prisma__FixtureClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    championship<T extends Prisma.ChampionshipDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ChampionshipDefaultArgs<ExtArgs>>): Prisma.Prisma__ChampionshipClient<runtime.Types.Result.GetResult<Prisma.$ChampionshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    homeTeam<T extends Prisma.TeamDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TeamDefaultArgs<ExtArgs>>): Prisma.Prisma__TeamClient<runtime.Types.Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    awayTeam<T extends Prisma.TeamDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TeamDefaultArgs<ExtArgs>>): Prisma.Prisma__TeamClient<runtime.Types.Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    predictions<T extends Prisma.Fixture$predictionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Fixture$predictionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    pointHistory<T extends Prisma.Fixture$pointHistoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Fixture$pointHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PointHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FixtureFieldRefs {
    readonly id: Prisma.FieldRef<"Fixture", 'Int'>;
    readonly externalId: Prisma.FieldRef<"Fixture", 'Int'>;
    readonly championshipId: Prisma.FieldRef<"Fixture", 'Int'>;
    readonly homeTeamId: Prisma.FieldRef<"Fixture", 'Int'>;
    readonly awayTeamId: Prisma.FieldRef<"Fixture", 'Int'>;
    readonly date: Prisma.FieldRef<"Fixture", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Fixture", 'FixtureStatus'>;
    readonly homeScore: Prisma.FieldRef<"Fixture", 'Int'>;
    readonly awayScore: Prisma.FieldRef<"Fixture", 'Int'>;
    readonly round: Prisma.FieldRef<"Fixture", 'Int'>;
    readonly phase: Prisma.FieldRef<"Fixture", 'CupPhase'>;
    readonly createdAt: Prisma.FieldRef<"Fixture", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Fixture", 'DateTime'>;
}
export type FixtureFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FixtureSelect<ExtArgs> | null;
    omit?: Prisma.FixtureOmit<ExtArgs> | null;
    include?: Prisma.FixtureInclude<ExtArgs> | null;
    where: Prisma.FixtureWhereUniqueInput;
};
export type FixtureFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FixtureSelect<ExtArgs> | null;
    omit?: Prisma.FixtureOmit<ExtArgs> | null;
    include?: Prisma.FixtureInclude<ExtArgs> | null;
    where: Prisma.FixtureWhereUniqueInput;
};
export type FixtureFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FixtureFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FixtureFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FixtureCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FixtureSelect<ExtArgs> | null;
    omit?: Prisma.FixtureOmit<ExtArgs> | null;
    include?: Prisma.FixtureInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FixtureCreateInput, Prisma.FixtureUncheckedCreateInput>;
};
export type FixtureCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FixtureCreateManyInput | Prisma.FixtureCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FixtureUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FixtureSelect<ExtArgs> | null;
    omit?: Prisma.FixtureOmit<ExtArgs> | null;
    include?: Prisma.FixtureInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FixtureUpdateInput, Prisma.FixtureUncheckedUpdateInput>;
    where: Prisma.FixtureWhereUniqueInput;
};
export type FixtureUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FixtureUpdateManyMutationInput, Prisma.FixtureUncheckedUpdateManyInput>;
    where?: Prisma.FixtureWhereInput;
    limit?: number;
};
export type FixtureUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FixtureSelect<ExtArgs> | null;
    omit?: Prisma.FixtureOmit<ExtArgs> | null;
    include?: Prisma.FixtureInclude<ExtArgs> | null;
    where: Prisma.FixtureWhereUniqueInput;
    create: Prisma.XOR<Prisma.FixtureCreateInput, Prisma.FixtureUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FixtureUpdateInput, Prisma.FixtureUncheckedUpdateInput>;
};
export type FixtureDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FixtureSelect<ExtArgs> | null;
    omit?: Prisma.FixtureOmit<ExtArgs> | null;
    include?: Prisma.FixtureInclude<ExtArgs> | null;
    where: Prisma.FixtureWhereUniqueInput;
};
export type FixtureDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FixtureWhereInput;
    limit?: number;
};
export type Fixture$predictionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Fixture$pointHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FixtureDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FixtureSelect<ExtArgs> | null;
    omit?: Prisma.FixtureOmit<ExtArgs> | null;
    include?: Prisma.FixtureInclude<ExtArgs> | null;
};
