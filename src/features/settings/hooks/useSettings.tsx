import {useMutation, useQuery} from "@apollo/client";
import {useCallback} from "react";
import {GetSettingsDocument, SettingsInput, UpdateSettingsDocument} from "../../../api/graphql/_generated_/types.ts";

export function useSettings() {
  const {data, loading, error} = useQuery(GetSettingsDocument, {fetchPolicy: "cache-first"});
  const [updateSettingsMutation] = useMutation(UpdateSettingsDocument);

  const updateSettings = useCallback(
    (newSettings: SettingsInput) =>
      updateSettingsMutation({variables: {settings: newSettings}}),
    [updateSettingsMutation]
  );

  return {
    settings: data?.settings,
    loading,
    error,
    updateSettings,
  };
}
