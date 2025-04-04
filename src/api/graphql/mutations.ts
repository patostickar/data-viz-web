import {gql} from "@apollo/client";

export const GET_SETTINGS = gql`
  query GetSettings {
    settings {
      NumPlotsPerChart
      NumPoints
    }
  }
`;

export const UPDATE_SETTINGS = gql`
  mutation UpdateSettings($settings: SettingsInput!) {
    updateSettings(settings: $settings) {
      NumPlotsPerChart
      NumPoints
    }
  }
`;
