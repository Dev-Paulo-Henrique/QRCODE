import { useState, useEffect } from "react";
import { database } from "../services/firebase";
import { ref, child, get } from "firebase/database";

type useUsersProps = {
  id?: string;
  username?: string | undefined;
  phone?: string | undefined;
  isValid?: boolean;
  code?: string | undefined;
};

export function useUsers() {
  const [users, setUsers] = useState<useUsersProps[]>([]);

  useEffect(() => {
    get(child(ref(database), "users"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersData = snapshot.val();
          const usersArray = Object.keys(usersData).map((key) => ({
            id: key,
            ...usersData[key],
          }));
          setUsers(usersArray);
        } else {
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [users]);

  return { users };
}
