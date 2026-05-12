/**
 * For admin portal: show all menu items (optional permission filter later)
 */
export const filterMenu = (items, context) => {
  const { user } = context;
  if (!user) return [];
  return items.filter((item) => {
    if (item.permissions?.length) {
      return item.permissions.some((perm) => {
        const slug = typeof perm === 'string' ? perm : `${perm.resource}:${perm.action}`;
        return (user.permissions || []).includes(slug);
      });
    }
    return true;
  });
};

export const adjustMenuPaths = (items) => items;
