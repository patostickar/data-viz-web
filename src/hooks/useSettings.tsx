import {gql, useMutation, useQuery} from "@apollo/client";

const GET_SETTINGS = gql`
  query GetSettings {
    settings {
      NumPlotsPerChart
      NumPoints
      PollInterval
    }
  }
`;

const UPDATE_SETTINGS = gql`
  mutation UpdateSettings($settings: SettingsInput!) {
    updateSettings(settings: $settings) {
      NumPlotsPerChart
      NumPoints
      PollInterval
    }
  }
`;

export function useSettings() {
  const {data, loading, error} = useQuery(GET_SETTINGS);
  const [updateSettings] = useMutation(UPDATE_SETTINGS);

  return {
    data,
    loading,
    error,
    updateSettings: (newSettings) => updateSettings({variables: {settings: newSettings}}),
  };
}
