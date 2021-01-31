import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import styled from "styled-components";
import { Dots } from "react-activity";
import "react-activity/dist/react-activity.css";

interface InputProps {
  address: string;
  setAddress: (address: string) => void;
  handleSetSelection: (
    placeId: string,
    name: string,
    address: string,
    latLng: { lat: number; lng: number }
  ) => void;
}

export default function LocationSearchInput({
  address,
  setAddress,
  handleSetSelection,
}: InputProps) {
  const selectAddress = async (
    address: string,
    placeId: string,
    suggestion?: {
      formattedSuggestion: any;
    }
  ) => {
    try {
      //Selection is the NAME + ADDRESS of the place
      //Name is the NAME of the place
      setAddress(address);

      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);

      const name = suggestion ? suggestion.formattedSuggestion.mainText : "";

      return handleSetSelection(placeId, name, address, latLng);
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
              {loading && <Dots />}
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
