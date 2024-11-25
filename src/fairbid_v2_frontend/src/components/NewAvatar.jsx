import BoringAvatar from 'boring-avatars';

const NewAvatar = ({ username, size }) => {
  // If no username is provided, return default avatar image
  if (!username) {
    return (
      <img 
        src="/default-avatar.png" // Add your default avatar image path
        alt="Default Avatar"
        width={size}
        height={size}
        className="rounded-full"
      />
    );
  }

  // Generate avatar based on username
  return (
    <BoringAvatar
      size={size}
      name={username}
      variant="beam" // You can choose: 'pixel', 'bauhaus', 'ring', 'beam', 'sunset'
      colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} // Optional custom colors
    />
  );
};

export default NewAvatar;