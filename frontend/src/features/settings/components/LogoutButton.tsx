import { Button } from '@/components/ui/Button';

interface LogoutButtonProps {
  loading?: boolean;
  onPress: () => void;
}

export function LogoutButton({ loading = false, onPress }: LogoutButtonProps) {
  return (
    <Button
      label="Log out"
      variant="danger"
      size="lg"
      fullWidth
      loading={loading}
      onPress={onPress}
      accessibilityLabel="Log out"
      className="mb-8 mt-2"
    />
  );
}