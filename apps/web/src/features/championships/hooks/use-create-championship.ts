import { CreateChampionshipFormData } from '../schemas/create-championship';

export function useCreateChampionship() {
  return useForm<CreateChampionshipFormData>({
    resolver: zodResolver(createChampionshipSchema),

    defaultValues: {
      season: 2026,
      country: '',
      leagueId: 0,
      active: true,
    },
  });
}
