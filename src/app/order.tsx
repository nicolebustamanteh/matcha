
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import { products } from '../constants/products';

export default function Order() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((item) => item.id === id);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handlePhoneChange = (text: string) => {
    const numbers = text.replace(/[^0-9]/g, '').slice(0, 8);
    setPhone(numbers);

    if (numbers.length > 0 && numbers.length < 8) {
      setPhoneError(`Faltan ${8 - numbers.length} números`);
    } else {
      setPhoneError('');
    }
  };

  const isFormValid = name.trim().length >= 3 && phone.length === 8;

  const handleSubmit = () => {
    const validName = name.trim().length >= 3;
    const validPhone = /^\d{8}$/.test(phone);

    setNameError(validName ? '' : 'Escribe al menos 3 letras');
    setPhoneError(validPhone ? '' : 'El celular debe tener 8 números');

    if (validName && validPhone && product) {
      router.push({
        pathname: '/order-confirmed',
        params: {
          name: name.trim(),
          product: product.name,
          note: note.trim(),
        },
      });
    }
  };

  if (!product) {
    return <Text>Producto no encontrado.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.summary}>
        <Text style={styles.summaryEmoji}>{product.emoji}</Text>
        <View>
          <Text style={styles.summaryName}>{product.name}</Text>
          <Text style={styles.summaryPrice}>Bs {product.price}</Text>
        </View>
      </View>

      <Text style={styles.label}>Tu nombre</Text>
      <TextInput
        style={[styles.input, nameError ? styles.inputError : null]}
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (text.trim().length >= 3) setNameError('');
        }}
        placeholder="Ej. Ana"
      />
      {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

      <Text style={styles.label}>Celular</Text>
      <TextInput
        style={[styles.input, phoneError ? styles.inputError : null]}
        value={phone}
        onChangeText={handlePhoneChange}
        placeholder="Ej. 71234567"
        keyboardType="number-pad"
        maxLength={8}
      />
      {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}

      <Text style={styles.label}>Nota para el pedido (opcional)</Text>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Ej. menos hielo"
      />

      <Pressable
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Confirmar pedido</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    gap: 8,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 14,
    marginBottom: 16,
    borderRadius: 28,
    backgroundColor: colors.card,
    elevation: 2,
  },
  summaryEmoji: {
    width: 72,
    height: 72,
    borderRadius: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 36,
    backgroundColor: colors.primarySoft,
    overflow: 'hidden',
  },
  summaryName: {
    fontSize: 18,
    fontFamily: fonts.h2,
    color: colors.text,
  },
  summaryPrice: {
    fontSize: 20,
    fontFamily: fonts.h2,
    color: colors.primary,
  },
  label: {
    fontSize: 13,
    fontFamily: fonts.h2,
    color: colors.textMuted,
    marginTop: 12,
    marginLeft: 4,
  },
  input: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 16,
    fontFamily: fonts.p,
    borderWidth: 1.5,
    borderRadius: 18,
    borderColor: colors.border,
    backgroundColor: colors.card,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.error,
  },
  error: {
    fontSize: 13,
    fontFamily: fonts.p,
    color: colors.error,
    marginLeft: 4,
  },
  button: {
    marginTop: 32,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: colors.primary,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.4,
    elevation: 0,
  },
  buttonText: {
    fontSize: 17,
    fontFamily: fonts.h2,
    color: colors.onPrimary,
  },
});
