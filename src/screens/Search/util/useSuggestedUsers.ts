import {useMemo} from 'react'

import {useActorSearchPaginated} from '#/state/queries/actor-search'
import {useGetSuggestedUsersQuery} from '#/state/queries/trending/useGetSuggestedUsersQuery'
import {useInterestsDisplayNames} from '#/screens/Onboarding/state'

/**
 * Conditional hook, used in case a user is a non-english speaker, in which
 * case we fall back to searching for users instead of our more curated set.
 */
export function useSuggestedUsers({
  category = null,
  search = false,
<<<<<<< HEAD
=======
  overrideInterests,
>>>>>>> upstream/main
}: {
  category?: string | null
  /**
   * If true, we'll search for users using the translated value of `category`,
   * based on the user's "app language setting
   */
  search?: boolean
<<<<<<< HEAD
=======
  /**
   * In onboarding, interests haven't been saved to prefs yet, so we need to
   * pass them down through here
   */
  overrideInterests?: string[]
>>>>>>> upstream/main
}) {
  const interestsDisplayNames = useInterestsDisplayNames()
  const curated = useGetSuggestedUsersQuery({
    enabled: !search,
    category,
<<<<<<< HEAD
=======
    overrideInterests,
>>>>>>> upstream/main
  })
  const searched = useActorSearchPaginated({
    enabled: !!search,
    // use user's app language translation for this value
    query: category ? interestsDisplayNames[category] : '',
    limit: 10,
  })

  return useMemo(() => {
    if (search) {
      return {
        // we're not paginating right now
        data: searched?.data
          ? {
              actors: searched.data.pages.flatMap(p => p.actors) ?? [],
            }
          : undefined,
        isLoading: searched.isLoading,
        error: searched.error,
        isRefetching: searched.isRefetching,
<<<<<<< HEAD
=======
        refetch: searched.refetch,
>>>>>>> upstream/main
      }
    } else {
      return {
        data: curated.data,
        isLoading: curated.isLoading,
        error: curated.error,
        isRefetching: curated.isRefetching,
<<<<<<< HEAD
=======
        refetch: curated.refetch,
>>>>>>> upstream/main
      }
    }
  }, [curated, searched, search])
}
