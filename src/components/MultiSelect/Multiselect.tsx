import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import styles from './styles';
import DropdownArrow from '../../../assets/icons/svg/dropdownArrow';
import CloseIcon from '../../../assets/icons/svg/closeIcon';
type Option = {
  label: string;
  value: string;
};

type MultiselectProps = {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
};

const Multiselect: React.FC<MultiselectProps> = ({
  options,
  selected,
  onChange,
  placeholder = 'Select options',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    direction: 'below', // 'below' or 'above'
  });
  const containerRef = useRef<View>(null);
  const screenHeight = Dimensions.get('window').height;

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleRemove = (value: string) => {
    onChange(selected.filter(v => v !== value));
  };

  const clearAll = () => {
    onChange([]);
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase()),
  );
  const handleLayout = () => {
    if (containerRef.current) {
      containerRef.current.measureInWindow((x, y, width, height) => {
        // Calculate available space below the input
        const spaceBelow = screenHeight - y - height;
        const spaceAbove = y;
        const dropdownHeight = 200; // Your desired dropdown height

        // Determine if dropdown should appear above or below
        const direction =
          spaceBelow < dropdownHeight && spaceAbove > spaceBelow ? 'above' : 'below';

        // Calculate top position based on direction
        const top = direction === 'below' ? y + height : y - dropdownHeight;

        setDropdownPosition({
          top,
          left: x,
          width: width,
          direction,
        });
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleLayout();
    }
  }, [isOpen]);

  return (
    <View style={styles.container} ref={containerRef} onLayout={handleLayout}>
      <TouchableOpacity
        style={[styles.tagsContainer, isOpen && styles.tagsContainerOpen]}
        onPress={() => setIsOpen(!isOpen)}>
        <View style={styles.tags}>
          {selected.map(value => {
            const option = options.find(opt => opt.value === value);
            return option ? (
              <View key={value} style={styles.tag}>
                <Text style={styles.tagText}>{option.label}</Text>
                <TouchableOpacity style={styles.tagRemove} onPress={() => handleRemove(value)}>
                  <CloseIcon width={16} height={16} fill="#666" />
                </TouchableOpacity>
              </View>
            ) : null;
          })}
          <TextInput
            style={styles.input}
            placeholder={selected.length === 0 ? placeholder : ''}
            value={search}
            onChangeText={setSearch}
            onFocus={() => setIsOpen(true)}
          />
        </View>
        {selected.length > 0 && (
          <TouchableOpacity style={styles.clearAll} onPress={clearAll}>
            <CloseIcon width={20} height={20} fill="#999" />
          </TouchableOpacity>
        )}
        <View style={styles.dropdownArrow}>
          <DropdownArrow
            width={22}
            height={22}
            fill="#666"
            style={isOpen ? styles.openDropDrown : styles.closeDropDown}
          />
        </View>
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsOpen(false)}>
          <View
            style={[
              styles.dropdown,
              {
                position: 'absolute',
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
                maxHeight: 200,
              },
              dropdownPosition.direction === 'above' && styles.dropdownAbove,
            ]}>
            <ScrollView>
              {filteredOptions.map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.dropdownItem,
                    selected.includes(option.value) && styles.dropdownItemSelected,
                  ]}
                  onPress={() => handleSelect(option.value)}>
                  <Text>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Multiselect;

// example usage

/*
const TestApp = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
  ];
  return (
    <View style={styles.container}>   // keep this, dont remove
      <View style={styles.multiSelectContainer}>
        <Text style={styles.title}>Select Options</Text>
        <Multiselect
          options={options}
          selected={selectedValues}
          onChange={setSelectedValues}
          placeholder="Choose options"
        />
        <Text style={styles.selectedText}>Selected: {selectedValues.join(', ')}</Text>
      </View>
    </View>
  );
};
*/
