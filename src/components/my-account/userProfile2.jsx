import React from "react";

export const userProfile = () => {
  return (
    // Not in use ATM since clerk user management is used under My Account
    <section className="border rounded-lg p-6 shadow-sm bg-card">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      <div className="flex items-center gap-4">
        <img src={user.imageUrl} alt={user.fullName} className="w-16 h-16 rounded-full" />
        <div>
          <p className="font-semibold">{user.fullName}</p>
          <p className="text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</p>
        </div>
      </div>
    </section>
  );
};
