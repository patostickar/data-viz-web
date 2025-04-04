import {useMutation, useQuery} from "@apollo/client";
import {
  GetSettingsDocument,
  GetSettingsQuery,
  SettingsInput,
  UpdateSettingsDocument,
  UpdateSettingsMutation
} from "../generated/graphql.ts";

// const GET_SETTINGS = gql`
//   query GetSettings {
//     settings {
//       NumPlotsPerChart
//       NumPoints
//     }
//   }
// `;

// const UPDATE_SETTINGS = gql`
//   mutation UpdateSettings($settings: SettingsInput!) {
//     updateSettings(settings: $settings) {
//       NumPlotsPerChart
//       NumPoints
//     }
//   }
// `;

export function useSettings() {
  const {data, loading, error} = useQuery<GetSettingsQuery>(GetSettingsDocument);
  const [updateSettings] = useMutation<UpdateSettingsMutation>(UpdateSettingsDocument);

  return {
    settings: data?.settings,
    loading,
    error,
    updateSettings: (newSettings: SettingsInput) => updateSettings({variables: {settings: newSettings}}),
  };
}
