import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TeamModel = runtime.Types.Result.DefaultSelection<Prisma.$TeamPayload>;
export type AggregateTeam = {
    _count: TeamCountAggregateOutputType | null;
    _avg: TeamAvgAggregateOutputType | null;
    _sum: TeamSumAggregateOutputType | null;
    _min: TeamMinAggregateOutputType | null;
    _max: TeamMaxAggregateOutputType | null;
};
export type TeamAvgAggregateOutputType = {
    id: number | null;
    externalId: number | null;
};
export type TeamSumAggregateOutputType = {
    id: number | null;
    externalId: number | null;
};
export type TeamMinAggregateOutputType = {
    id: number | null;
    externalId: number | null;
    name: string | null;
    logo: string | null;
    country: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TeamMaxAggregateOutputType = {
    id: number | null;
    externalId: number | null;
    name: string | null;
    logo: string | null;
    country: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TeamCountAggregateOutputType = {
    id: number;
    externalId: number;
    name: number;
    logo: number;
    country: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type TeamAvgAggregateInputType = {
    id?: true;
    externalId?: true;
};
export type TeamSumAggregateInputType = {
    id?: true;
    externalId?: true;
};
export type TeamMinAggregateInputType = {
    id?: true;
    externalId?: true;
    name?: true;
    logo?: true;
    country?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TeamMaxAggregateInputType = {
    id?: true;
    externalId?: true;
    name?: true;
    logo?: true;
    country?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TeamCountAggregateInputType = {
    id?: true;
    externalId?: true;
    name?: true;
    logo?: true;
    country?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type TeamAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TeamWhereInput;
    orderBy?: Prisma.TeamOrderByWithRelationInput | Prisma.TeamOrderByWithRelationInput[];
    cursor?: Prisma.TeamWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TeamCountAggregateInputType;
    _avg?: TeamAvgAggregateInputType;
    _sum?: TeamSumAggregateInputType;
    _min?: TeamMinAggregateInputType;
    _max?: TeamMaxAggregateInputType;
};
export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
    [P in keyof T & keyof AggregateTeam]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTeam[P]> : Prisma.GetScalarType<T[P], AggregateTeam[P]>;
};
export type TeamGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TeamWhereInput;
    orderBy?: Prisma.TeamOrderByWithAggregationInput | Prisma.TeamOrderByWithAggregationInput[];
    by: Prisma.TeamScalarFieldEnum[] | Prisma.TeamScalarFieldEnum;
    having?: Prisma.TeamScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TeamCountAggregateInputType | true;
    _avg?: TeamAvgAggregateInputType;
    _sum?: TeamSumAggregateInputType;
    _min?: TeamMinAggregateInputType;
    _max?: TeamMaxAggregateInputType;
};
export type TeamGroupByOutputType = {
    id: number;
    externalId: number;
    name: string;
    logo: string;
    country: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: TeamCountAggregateOutputType | null;
    _avg: TeamAvgAggregateOutputType | null;
    _sum: TeamSumAggregateOutputType | null;
    _min: TeamMinAggregateOutputType | null;
    _max: TeamMaxAggregateOutputType | null;
};
export type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TeamGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TeamGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TeamGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TeamGroupByOutputType[P]>;
}>>;
export type TeamWhereInput = {
    AND?: Prisma.TeamWhereInput | Prisma.TeamWhereInput[];
    OR?: Prisma.TeamWhereInput[];
    NOT?: Prisma.TeamWhereInput | Prisma.TeamWhereInput[];
    id?: Prisma.IntFilter<"Team"> | number;
    externalId?: Prisma.IntFilter<"Team"> | number;
    name?: Prisma.StringFilter<"Team"> | string;
    logo?: Prisma.StringFilter<"Team"> | string;
    country?: Prisma.StringNullableFilter<"Team"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Team"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Team"> | Date | string;
    homeFixtures?: Prisma.FixtureListRelationFilter;
    awayFixtures?: Prisma.FixtureListRelationFilter;
};
export type TeamOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    logo?: Prisma.SortOrder;
    country?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    homeFixtures?: Prisma.FixtureOrderByRelationAggregateInput;
    awayFixtures?: Prisma.FixtureOrderByRelationAggregateInput;
    _relevance?: Prisma.TeamOrderByRelevanceInput;
};
export type TeamWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    externalId?: number;
    AND?: Prisma.TeamWhereInput | Prisma.TeamWhereInput[];
    OR?: Prisma.TeamWhereInput[];
    NOT?: Prisma.TeamWhereInput | Prisma.TeamWhereInput[];
    name?: Prisma.StringFilter<"Team"> | string;
    logo?: Prisma.StringFilter<"Team"> | string;
    country?: Prisma.StringNullableFilter<"Team"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Team"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Team"> | Date | string;
    homeFixtures?: Prisma.FixtureListRelationFilter;
    awayFixtures?: Prisma.FixtureListRelationFilter;
}, "id" | "externalId">;
export type TeamOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    logo?: Prisma.SortOrder;
    country?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.TeamCountOrderByAggregateInput;
    _avg?: Prisma.TeamAvgOrderByAggregateInput;
    _max?: Prisma.TeamMaxOrderByAggregateInput;
    _min?: Prisma.TeamMinOrderByAggregateInput;
    _sum?: Prisma.TeamSumOrderByAggregateInput;
};
export type TeamScalarWhereWithAggregatesInput = {
    AND?: Prisma.TeamScalarWhereWithAggregatesInput | Prisma.TeamScalarWhereWithAggregatesInput[];
    OR?: Prisma.TeamScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TeamScalarWhereWithAggregatesInput | Prisma.TeamScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Team"> | number;
    externalId?: Prisma.IntWithAggregatesFilter<"Team"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Team"> | string;
    logo?: Prisma.StringWithAggregatesFilter<"Team"> | string;
    country?: Prisma.StringNullableWithAggregatesFilter<"Team"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Team"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Team"> | Date | string;
};
export type TeamCreateInput = {
    externalId: number;
    name: string;
    logo?: string;
    country?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    homeFixtures?: Prisma.FixtureCreateNestedManyWithoutHomeTeamInput;
    awayFixtures?: Prisma.FixtureCreateNestedManyWithoutAwayTeamInput;
};
export type TeamUncheckedCreateInput = {
    id?: number;
    externalId: number;
    name: string;
    logo?: string;
    country?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    homeFixtures?: Prisma.FixtureUncheckedCreateNestedManyWithoutHomeTeamInput;
    awayFixtures?: Prisma.FixtureUncheckedCreateNestedManyWithoutAwayTeamInput;
};
export type TeamUpdateInput = {
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    homeFixtures?: Prisma.FixtureUpdateManyWithoutHomeTeamNestedInput;
    awayFixtures?: Prisma.FixtureUpdateManyWithoutAwayTeamNestedInput;
};
export type TeamUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    homeFixtures?: Prisma.FixtureUncheckedUpdateManyWithoutHomeTeamNestedInput;
    awayFixtures?: Prisma.FixtureUncheckedUpdateManyWithoutAwayTeamNestedInput;
};
export type TeamCreateManyInput = {
    id?: number;
    externalId: number;
    name: string;
    logo?: string;
    country?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TeamUpdateManyMutationInput = {
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TeamUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TeamOrderByRelevanceInput = {
    fields: Prisma.TeamOrderByRelevanceFieldEnum | Prisma.TeamOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type TeamCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    logo?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TeamAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
};
export type TeamMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    logo?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TeamMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    logo?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TeamSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    externalId?: Prisma.SortOrder;
};
export type TeamScalarRelationFilter = {
    is?: Prisma.TeamWhereInput;
    isNot?: Prisma.TeamWhereInput;
};
export type TeamCreateNestedOneWithoutHomeFixturesInput = {
    create?: Prisma.XOR<Prisma.TeamCreateWithoutHomeFixturesInput, Prisma.TeamUncheckedCreateWithoutHomeFixturesInput>;
    connectOrCreate?: Prisma.TeamCreateOrConnectWithoutHomeFixturesInput;
    connect?: Prisma.TeamWhereUniqueInput;
};
export type TeamCreateNestedOneWithoutAwayFixturesInput = {
    create?: Prisma.XOR<Prisma.TeamCreateWithoutAwayFixturesInput, Prisma.TeamUncheckedCreateWithoutAwayFixturesInput>;
    connectOrCreate?: Prisma.TeamCreateOrConnectWithoutAwayFixturesInput;
    connect?: Prisma.TeamWhereUniqueInput;
};
export type TeamUpdateOneRequiredWithoutHomeFixturesNestedInput = {
    create?: Prisma.XOR<Prisma.TeamCreateWithoutHomeFixturesInput, Prisma.TeamUncheckedCreateWithoutHomeFixturesInput>;
    connectOrCreate?: Prisma.TeamCreateOrConnectWithoutHomeFixturesInput;
    upsert?: Prisma.TeamUpsertWithoutHomeFixturesInput;
    connect?: Prisma.TeamWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TeamUpdateToOneWithWhereWithoutHomeFixturesInput, Prisma.TeamUpdateWithoutHomeFixturesInput>, Prisma.TeamUncheckedUpdateWithoutHomeFixturesInput>;
};
export type TeamUpdateOneRequiredWithoutAwayFixturesNestedInput = {
    create?: Prisma.XOR<Prisma.TeamCreateWithoutAwayFixturesInput, Prisma.TeamUncheckedCreateWithoutAwayFixturesInput>;
    connectOrCreate?: Prisma.TeamCreateOrConnectWithoutAwayFixturesInput;
    upsert?: Prisma.TeamUpsertWithoutAwayFixturesInput;
    connect?: Prisma.TeamWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TeamUpdateToOneWithWhereWithoutAwayFixturesInput, Prisma.TeamUpdateWithoutAwayFixturesInput>, Prisma.TeamUncheckedUpdateWithoutAwayFixturesInput>;
};
export type TeamCreateWithoutHomeFixturesInput = {
    externalId: number;
    name: string;
    logo?: string;
    country?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    awayFixtures?: Prisma.FixtureCreateNestedManyWithoutAwayTeamInput;
};
export type TeamUncheckedCreateWithoutHomeFixturesInput = {
    id?: number;
    externalId: number;
    name: string;
    logo?: string;
    country?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    awayFixtures?: Prisma.FixtureUncheckedCreateNestedManyWithoutAwayTeamInput;
};
export type TeamCreateOrConnectWithoutHomeFixturesInput = {
    where: Prisma.TeamWhereUniqueInput;
    create: Prisma.XOR<Prisma.TeamCreateWithoutHomeFixturesInput, Prisma.TeamUncheckedCreateWithoutHomeFixturesInput>;
};
export type TeamCreateWithoutAwayFixturesInput = {
    externalId: number;
    name: string;
    logo?: string;
    country?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    homeFixtures?: Prisma.FixtureCreateNestedManyWithoutHomeTeamInput;
};
export type TeamUncheckedCreateWithoutAwayFixturesInput = {
    id?: number;
    externalId: number;
    name: string;
    logo?: string;
    country?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    homeFixtures?: Prisma.FixtureUncheckedCreateNestedManyWithoutHomeTeamInput;
};
export type TeamCreateOrConnectWithoutAwayFixturesInput = {
    where: Prisma.TeamWhereUniqueInput;
    create: Prisma.XOR<Prisma.TeamCreateWithoutAwayFixturesInput, Prisma.TeamUncheckedCreateWithoutAwayFixturesInput>;
};
export type TeamUpsertWithoutHomeFixturesInput = {
    update: Prisma.XOR<Prisma.TeamUpdateWithoutHomeFixturesInput, Prisma.TeamUncheckedUpdateWithoutHomeFixturesInput>;
    create: Prisma.XOR<Prisma.TeamCreateWithoutHomeFixturesInput, Prisma.TeamUncheckedCreateWithoutHomeFixturesInput>;
    where?: Prisma.TeamWhereInput;
};
export type TeamUpdateToOneWithWhereWithoutHomeFixturesInput = {
    where?: Prisma.TeamWhereInput;
    data: Prisma.XOR<Prisma.TeamUpdateWithoutHomeFixturesInput, Prisma.TeamUncheckedUpdateWithoutHomeFixturesInput>;
};
export type TeamUpdateWithoutHomeFixturesInput = {
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    awayFixtures?: Prisma.FixtureUpdateManyWithoutAwayTeamNestedInput;
};
export type TeamUncheckedUpdateWithoutHomeFixturesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    awayFixtures?: Prisma.FixtureUncheckedUpdateManyWithoutAwayTeamNestedInput;
};
export type TeamUpsertWithoutAwayFixturesInput = {
    update: Prisma.XOR<Prisma.TeamUpdateWithoutAwayFixturesInput, Prisma.TeamUncheckedUpdateWithoutAwayFixturesInput>;
    create: Prisma.XOR<Prisma.TeamCreateWithoutAwayFixturesInput, Prisma.TeamUncheckedCreateWithoutAwayFixturesInput>;
    where?: Prisma.TeamWhereInput;
};
export type TeamUpdateToOneWithWhereWithoutAwayFixturesInput = {
    where?: Prisma.TeamWhereInput;
    data: Prisma.XOR<Prisma.TeamUpdateWithoutAwayFixturesInput, Prisma.TeamUncheckedUpdateWithoutAwayFixturesInput>;
};
export type TeamUpdateWithoutAwayFixturesInput = {
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    homeFixtures?: Prisma.FixtureUpdateManyWithoutHomeTeamNestedInput;
};
export type TeamUncheckedUpdateWithoutAwayFixturesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    externalId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    logo?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    homeFixtures?: Prisma.FixtureUncheckedUpdateManyWithoutHomeTeamNestedInput;
};
export type TeamCountOutputType = {
    homeFixtures: number;
    awayFixtures: number;
};
export type TeamCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    homeFixtures?: boolean | TeamCountOutputTypeCountHomeFixturesArgs;
    awayFixtures?: boolean | TeamCountOutputTypeCountAwayFixturesArgs;
};
export type TeamCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeamCountOutputTypeSelect<ExtArgs> | null;
};
export type TeamCountOutputTypeCountHomeFixturesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FixtureWhereInput;
};
export type TeamCountOutputTypeCountAwayFixturesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FixtureWhereInput;
};
export type TeamSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    externalId?: boolean;
    name?: boolean;
    logo?: boolean;
    country?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    homeFixtures?: boolean | Prisma.Team$homeFixturesArgs<ExtArgs>;
    awayFixtures?: boolean | Prisma.Team$awayFixturesArgs<ExtArgs>;
    _count?: boolean | Prisma.TeamCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["team"]>;
export type TeamSelectScalar = {
    id?: boolean;
    externalId?: boolean;
    name?: boolean;
    logo?: boolean;
    country?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type TeamOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "externalId" | "name" | "logo" | "country" | "createdAt" | "updatedAt", ExtArgs["result"]["team"]>;
export type TeamInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    homeFixtures?: boolean | Prisma.Team$homeFixturesArgs<ExtArgs>;
    awayFixtures?: boolean | Prisma.Team$awayFixturesArgs<ExtArgs>;
    _count?: boolean | Prisma.TeamCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $TeamPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Team";
    objects: {
        homeFixtures: Prisma.$FixturePayload<ExtArgs>[];
        awayFixtures: Prisma.$FixturePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        externalId: number;
        name: string;
        logo: string;
        country: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["team"]>;
    composites: {};
};
export type TeamGetPayload<S extends boolean | null | undefined | TeamDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TeamPayload, S>;
export type TeamCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TeamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TeamCountAggregateInputType | true;
};
export interface TeamDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Team'];
        meta: {
            name: 'Team';
        };
    };
    findUnique<T extends TeamFindUniqueArgs>(args: Prisma.SelectSubset<T, TeamFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TeamClient<runtime.Types.Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TeamFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TeamClient<runtime.Types.Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TeamFindFirstArgs>(args?: Prisma.SelectSubset<T, TeamFindFirstArgs<ExtArgs>>): Prisma.Prisma__TeamClient<runtime.Types.Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TeamFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TeamFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TeamClient<runtime.Types.Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TeamFindManyArgs>(args?: Prisma.SelectSubset<T, TeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TeamCreateArgs>(args: Prisma.SelectSubset<T, TeamCreateArgs<ExtArgs>>): Prisma.Prisma__TeamClient<runtime.Types.Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TeamCreateManyArgs>(args?: Prisma.SelectSubset<T, TeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends TeamDeleteArgs>(args: Prisma.SelectSubset<T, TeamDeleteArgs<ExtArgs>>): Prisma.Prisma__TeamClient<runtime.Types.Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TeamUpdateArgs>(args: Prisma.SelectSubset<T, TeamUpdateArgs<ExtArgs>>): Prisma.Prisma__TeamClient<runtime.Types.Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TeamDeleteManyArgs>(args?: Prisma.SelectSubset<T, TeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TeamUpdateManyArgs>(args: Prisma.SelectSubset<T, TeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends TeamUpsertArgs>(args: Prisma.SelectSubset<T, TeamUpsertArgs<ExtArgs>>): Prisma.Prisma__TeamClient<runtime.Types.Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TeamCountArgs>(args?: Prisma.Subset<T, TeamCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TeamCountAggregateOutputType> : number>;
    aggregate<T extends TeamAggregateArgs>(args: Prisma.Subset<T, TeamAggregateArgs>): Prisma.PrismaPromise<GetTeamAggregateType<T>>;
    groupBy<T extends TeamGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TeamGroupByArgs['orderBy'];
    } : {
        orderBy?: TeamGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TeamFieldRefs;
}
export interface Prisma__TeamClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    homeFixtures<T extends Prisma.Team$homeFixturesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Team$homeFixturesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FixturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    awayFixtures<T extends Prisma.Team$awayFixturesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Team$awayFixturesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FixturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TeamFieldRefs {
    readonly id: Prisma.FieldRef<"Team", 'Int'>;
    readonly externalId: Prisma.FieldRef<"Team", 'Int'>;
    readonly name: Prisma.FieldRef<"Team", 'String'>;
    readonly logo: Prisma.FieldRef<"Team", 'String'>;
    readonly country: Prisma.FieldRef<"Team", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Team", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Team", 'DateTime'>;
}
export type TeamFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeamSelect<ExtArgs> | null;
    omit?: Prisma.TeamOmit<ExtArgs> | null;
    include?: Prisma.TeamInclude<ExtArgs> | null;
    where: Prisma.TeamWhereUniqueInput;
};
export type TeamFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeamSelect<ExtArgs> | null;
    omit?: Prisma.TeamOmit<ExtArgs> | null;
    include?: Prisma.TeamInclude<ExtArgs> | null;
    where: Prisma.TeamWhereUniqueInput;
};
export type TeamFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeamSelect<ExtArgs> | null;
    omit?: Prisma.TeamOmit<ExtArgs> | null;
    include?: Prisma.TeamInclude<ExtArgs> | null;
    where?: Prisma.TeamWhereInput;
    orderBy?: Prisma.TeamOrderByWithRelationInput | Prisma.TeamOrderByWithRelationInput[];
    cursor?: Prisma.TeamWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TeamScalarFieldEnum | Prisma.TeamScalarFieldEnum[];
};
export type TeamFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeamSelect<ExtArgs> | null;
    omit?: Prisma.TeamOmit<ExtArgs> | null;
    include?: Prisma.TeamInclude<ExtArgs> | null;
    where?: Prisma.TeamWhereInput;
    orderBy?: Prisma.TeamOrderByWithRelationInput | Prisma.TeamOrderByWithRelationInput[];
    cursor?: Prisma.TeamWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TeamScalarFieldEnum | Prisma.TeamScalarFieldEnum[];
};
export type TeamFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeamSelect<ExtArgs> | null;
    omit?: Prisma.TeamOmit<ExtArgs> | null;
    include?: Prisma.TeamInclude<ExtArgs> | null;
    where?: Prisma.TeamWhereInput;
    orderBy?: Prisma.TeamOrderByWithRelationInput | Prisma.TeamOrderByWithRelationInput[];
    cursor?: Prisma.TeamWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TeamScalarFieldEnum | Prisma.TeamScalarFieldEnum[];
};
export type TeamCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeamSelect<ExtArgs> | null;
    omit?: Prisma.TeamOmit<ExtArgs> | null;
    include?: Prisma.TeamInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TeamCreateInput, Prisma.TeamUncheckedCreateInput>;
};
export type TeamCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TeamCreateManyInput | Prisma.TeamCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TeamUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeamSelect<ExtArgs> | null;
    omit?: Prisma.TeamOmit<ExtArgs> | null;
    include?: Prisma.TeamInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TeamUpdateInput, Prisma.TeamUncheckedUpdateInput>;
    where: Prisma.TeamWhereUniqueInput;
};
export type TeamUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TeamUpdateManyMutationInput, Prisma.TeamUncheckedUpdateManyInput>;
    where?: Prisma.TeamWhereInput;
    limit?: number;
};
export type TeamUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeamSelect<ExtArgs> | null;
    omit?: Prisma.TeamOmit<ExtArgs> | null;
    include?: Prisma.TeamInclude<ExtArgs> | null;
    where: Prisma.TeamWhereUniqueInput;
    create: Prisma.XOR<Prisma.TeamCreateInput, Prisma.TeamUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TeamUpdateInput, Prisma.TeamUncheckedUpdateInput>;
};
export type TeamDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeamSelect<ExtArgs> | null;
    omit?: Prisma.TeamOmit<ExtArgs> | null;
    include?: Prisma.TeamInclude<ExtArgs> | null;
    where: Prisma.TeamWhereUniqueInput;
};
export type TeamDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TeamWhereInput;
    limit?: number;
};
export type Team$homeFixturesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Team$awayFixturesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TeamDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeamSelect<ExtArgs> | null;
    omit?: Prisma.TeamOmit<ExtArgs> | null;
    include?: Prisma.TeamInclude<ExtArgs> | null;
};
