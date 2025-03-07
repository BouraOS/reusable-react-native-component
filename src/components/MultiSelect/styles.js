import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 500,
  },
  tagsContainer: {
    minHeight: 35,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 4,
    position: 'relative',
  },
  tagsContainerOpen: {
    backgroundColor: 'white',
    borderColor: '#3978ff',
    shadowColor: '#3978ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tags: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    margin: 2,
  },
  tagText: {
    fontSize: 14,
  },
  tagRemove: {
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    minWidth: 50,
    padding: 4,
  },
  clearAll: {
    marginLeft: 'auto',
    padding: 2,
  },
  dropdownArrow: {},
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdown: {
    width: '80%',
    maxHeight: 200,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dropdownItemSelected: {
    backgroundColor: '#e6f2ff',
  },
  closeDropDown: {},
  openDropDrown: {
    transform: [{ rotate: '180deg' }],
  },
});

export default styles;
