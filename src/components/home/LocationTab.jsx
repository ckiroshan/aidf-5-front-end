function LocationTab({ location, selectedLocation, onClick }) {
  const isActive = location._id === selectedLocation;

  return (
    <button
      onClick={() => onClick(location)}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border
        ${isActive 
          ? "bg-primary text-white shadow-sm" 
          : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
        }`}
    >
      {location.name}
    </button>
  );
}

export default LocationTab;
