import React, { useState } from "react";
import { useRecoilValue } from 'recoil';
import { states } from '../states';

function Selector({ id, optionsState }) {
    const [message, setMessage] = useState("");
    const options = useRecoilValue(optionsState);
    const allAddOns = useRecoilValue(states.survivorItemAddOnsState);
    const currentAllowedItems = allItems.filter(i => i.allowed);
    let noItemAllowed = useRecoilValue(states.noItemAllowedState) ? 1 : 0;
    const currentAllowedAddOns = allAddOns.filter(a => a.allowed);
    let addEmptySlot = useRecoilValue(states.noItemAddOnAllowedState) ? 1 : 0
    function handleClick() {
        let chosenItem;
        let chosenAddOns = [];

        if (currentAllowedItems.length > 0) {
            let randomNumber = Math.floor(Math.random() * (currentAllowedItems.length + noItemAllowed));
            if (randomNumber !== currentAllowedItems.length) {
                item = currentAllowedItems[randomNumber]
                chosenItem = item.name;
            }
        }

        if (item) {
            let applicableAddOns = currentAllowedAddOns.filter(a => a.item_type_id == item.item_type_id)

        
            let alreadyChosen = []
            let numberOfAddOnsToChooseFrom = applicableAddOns.length < 2 ? applicableAddOns.length : 2

            for (let i = 0; i < numberOfAddOnsToChooseFrom ; i++) {
                let randomNumber;
                do {
                    randomNumber = Math.floor(Math.random() * (applicableAddOns.length + addEmptySlot));
                } while (alreadyChosen.includes(randomNumber))
                if (randomNumber !== applicableAddOns.length) {
                    chosenAddOns.push(applicableAddOns[randomNumber])
                    alreadyChosen.push(randomNumber)
                }
            }
        }

        handleItemMessage(item, chosenAddOns)
    }

    function handleItemMessage(selectedItem, selectedAddOns) {
        if (!selectedItem.name) {
            setMessage("No item")
        } else if (selectedItem.item_type_id !== "6" && selectedAddOns.length == 2) {
           setMessage(`${selectedItem.name} + ${handleAddOnMessage(selectedAddOns[0])} & ${handleAddOnMessage(selectedAddOns[1])}`)
        } else if (selectedItem.item_type_id !== "6" && selectedAddOns.length == 1) {
            setMessage(`${selectedItem.name} + ${handleAddOnMessage(selectedAddOns[0])}`)
        } else {
          setMessage(selectedItem.name)
        }
    }

    function handleAddOnMessage(addOn) {
      if (addOn?.name) {
        return addOn.name
      } else {
        return addOn
      }
    }

    function handlePerkMessage(selectedPerks) {
      selectedPerks.join();
    }

}