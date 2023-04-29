export const createRepo = async ({ 
  authResult, 
  repoInfo 
}: {
  authResult: any;
  repoInfo: { name: string; description: string; private: boolean; }
}) => {
  try {
    const response = await authResult.repos.createForAuthenticatedUser(repoInfo);

    return response.data.ssh_url; 
  } catch(error) {
    throw new Error('Failed to create repo.');
  }
};
