import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearItems } from '../../store/slices/selectedItemsSlice';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import styles from './Flyout.module.scss';
import { RootState } from '../../store/store';

interface SelectedItem {
  name: string;
}

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );

  const handleUnselectAll = () => {
    dispatch(clearItems());
  };

  const handleDownload = () => {
    const csvData: SelectedItem[] = selectedItems.map((item: string) => ({
      name: item,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const fileName = `${selectedItems.length}_pokemons.csv`;
    saveAs(blob, fileName);
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className={styles.flyout}>
      <p>{selectedItems.length} items are selected</p>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
