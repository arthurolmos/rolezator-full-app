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
  const selectAddress = async (selection: string) => {
    try {
      setAddress(selection);

      const results = await geocodeByAddress(address);

      const placeId = results[0].place_id;
      const latLng = await getLatLng(results[0]);

      return handleSetSelection(selection, placeId, latLng);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={(value: string) => setAddress(value)}
      onSelect={selectAddress}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        return (
          <div style={{ width: "100%" }}>
            <InputContainer>
              <Input
                {...getInputProps({
                  placeholder: "Procurar local...",
                  className: "location-search-input",
                })}
              />
              {address !== "" && (
                <ClearInput onClick={() => setAddress("")}>X</ClearInput>
              )}
            </InputContainer>
            <div
              style={{ width: "100%", overflowY: "auto", maxHeight: "300px" }}
            >
              {loading && <div>Carregando...</div>}
              {suggestions.map((suggestion: any, index: number) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";

                const style = suggestion.active
                  ? {
                      backgroundColor: "#fafafa",
                      cursor: "pointer",
                    }
                  : {
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                    };
                return (
                  <SuggestionsContainer
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={index}
                  >
                    <SuggestionTitle>
                      {suggestion.formattedSuggestion.mainText}
                    </SuggestionTitle>
                    <SuggestionDescription>
                      {suggestion.description}
                    </SuggestionDescription>
                  </SuggestionsContainer>
                );
              })}
            </div>
          </div>
        );
      }}
    </PlacesAutocomplete>
  );
}

const InputContainer = styled.div`
  position: relative;
`;

const ClearInput = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  margin-top: auto;
  margin-bottom: auto;
  z-index: 999;
  color: black;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  padding-right: 30px;

  &:focus {
    outline: none;
  }
`;

const SuggestionTitle = styled.p`
  color: black;
  padding: 0;
`;

const SuggestionDescription = styled.p`
  color: black;
  font-size: 10px;
`;

const SuggestionsContainer = styled.div`
  background: white;
  margin: 0;
  padding: 10px;
`;
