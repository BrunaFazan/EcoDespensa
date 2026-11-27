import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY='@ecodespensa/items/v1';
export async function loadItems(){const raw=await AsyncStorage.getItem(KEY);if(!raw)return [];const items=JSON.parse(raw);if(!Array.isArray(items))throw new Error('Dados locais inválidos.');return items;}
export async function saveItems(items){await AsyncStorage.setItem(KEY,JSON.stringify(items));}
