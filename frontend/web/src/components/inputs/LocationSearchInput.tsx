import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import styled from "styled-components";

interface InputProps {
  address: string;
  setAddress: (address: string) => void;
  handleSetSelection: (
    address: string,
    placeId: string,
    latLng: { lat: number; lng: number }
  ) => void;
}

export default function LocationSearchInput({
  address,
  setAddress,
  handleSetSelection,
}: InputProps) {
  const handleSelect = async (address: string) => {
    try {
      setAddress(address);

      const results = await geocodeByAddress(address);

      const placeId = results[0].place_id;
      const latLng = await getLatLng(results[0]);

      return handleSetSelection(address, placeId, latLng);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={(value: string) => setAddress(value)}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div style={{ width: "100%" }}>
          <InputStyled
            {...getInputProps({
              placeholder: "Procurar local...",
              className: "location-search-input",
            })}
          />
          <div style={{ width: "100%" }}>
            {loading && <div>Carregano...</div>}
            {suggestions.map((suggestion: any, index: number) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                  key={index}
                >
                  <span style={{ color: "black" }}>{suggestion.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

const InputStyled = styled.input`
  width: 100%;
  height: 30px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;
