// Libs
import useSWR from "swr";
import api from "../utils/swr";
import { useCallback, useState } from "react";

//TODO: Match with backend endpoint
const pathName = "/organization"; // End point

//? ============== GENERAL HOOK (ALL DATA) ============= ?//

export const useOrganizations = () => {
  const pathKeys = pathName;
  const [loading, setLoading] = useState(false);

  const { data = [], error, isValidating, mutate } = useSWR(pathKeys);
  const results = data?.data;

  // Add Hook Function
  const onAdd = useCallback(
    async (data) => {
      try {
        setLoading(true);
        const { data: res } = await api.post(pathName, data);
        if (res.success) {
          mutate();

          return res.success;
        } else {
          return res.success;
        }
      } catch (error) {
        return false;
      } finally {
        setLoading(false);
      }
    },
    [mutate]
  );
  // ==========================

  // Delete Hook Function
  const onDelete = useCallback(
    async (singleId) => {
      try {
        setLoading(true);
        const { data: res } = await api.delete(pathName + `/${singleId}`, data);
        if (res.success) {
          mutate();

          return res.success;
        } else {
          return res.success;
        }
      } catch (error) {
        return false;
      } finally {
        setLoading(false);
      }
    },
    [data, mutate]
  );
  // ==========================

  return {
    data: results,
    loading: (!error && !data) || isValidating || loading,
    onMutate: mutate,
    onAdd,
    onDelete,
  };
};

// * ====================================== * //

//? ============== SPECIFIC HOOK (SINGLE DATA) ============= ?//

export const useOrganization = ({ singleId }) => {
  const pathKeys = `${pathName}/${singleId}`;
  const [loading, setLoading] = useState(false);

  const { data = [], error, isValidating, mutate } = useSWR(pathKeys);
  const results = data?.data;
  const total = data?.data;

  // Edit Hook Function
  const onEdit = useCallback(
    async (data) => {
      try {
        setLoading(true);
        const { data: res } = await api.put(pathKeys, data);
        if (res.success) {
          mutate();

          return res.success;
        } else {
          return res.success;
        }
      } catch (error) {
        return false;
      } finally {
        setLoading(false);
      }
    },
    [mutate, pathKeys]
  );
  // ==========================

  return {
    data: results,
    total,
    loading: (!error && !data) || isValidating || loading,
    onEdit,
  };
};

// * ====================================== * //
