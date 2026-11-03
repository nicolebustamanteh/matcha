import { useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import {
    askNotificationPermission,
    scheduleOrderReady,
} from '../notifications/notifications';

export default function NotifyCard() {
  const [status, setStatus] = useState<
    'idle' | 'scheduled' | 'denied'
  >('idle');

  const [isLoading, setIsLoading] = useState(false);

  const handleNotify = async () => {
    setIsLoading(true);

    try {
      const allowed = await askNotificationPermission();

      if (allowed) {
        await scheduleOrderReady();
        setStatus('scheduled');
      } else {
        setStatus('denied');
      }
    } catch (error) {
      console.error('Error al activar las notificaciones:', error);
      setStatus('denied');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        ¿Te avisamos cuando esté listo?
      </Text>

      <Text style={styles.subtitle}>
        Recibe una notificación cuando tu pedido esté listo para recoger.
      </Text>

      <Pressable
        style={[
          styles.button,
          status === 'scheduled' && styles.buttonSuccess,
        ]}
        onPress={handleNotify}
        disabled={isLoading || status === 'scheduled'}
      >
        <Text style={styles.buttonText}>
          {isLoading
            ? 'Activando...'
            : status === 'scheduled'
              ? '¡Te avisaremos!'
              : status === 'denied'
                ? 'Intentar nuevamente'
                : 'Avísame'}
        </Text>
      </Pressable>

      {status === 'denied' ? (
        <Text style={styles.message}>
          No se pudieron activar las notificaciones. Revisa los permisos de tu celular.
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 20,
    gap: 10,
    borderRadius: 24,
    backgroundColor: colors.card,
    elevation: 2,
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.h2,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    fontFamily: fonts.p,
    lineHeight: 20,
    color: colors.textMuted,
    textAlign: 'center',
  },
  button: {
    marginTop: 6,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  buttonSuccess: {
    backgroundColor: colors.primarySoft,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: fonts.h2,
    color: colors.onPrimary,
  },
  message: {
    fontSize: 12,
    fontFamily: fonts.p,
    color: colors.error,
    textAlign: 'center',
  },
});