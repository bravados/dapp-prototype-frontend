import { GET_KIRUNALABS_USER_QUERY } from '@services/users/user.port';
import { useQueryClient } from '@tanstack/react-query';

function useRefetchKirunalabsUser() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({queryKey: [GET_KIRUNALABS_USER_QUERY]})
  }
}

export { useRefetchKirunalabsUser };
