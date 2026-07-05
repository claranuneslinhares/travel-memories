import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Viagem } from "../types/Viagem";

type Props = {
    viagem: Viagem;
    onDetalhes: () => void;
};

export default function CardViagem({ viagem, onDetalhes }: Props) {
    return (
        <View style={styles.card}>

            <Image
                source={{ uri: viagem.foto }}
                style={styles.imagem}
            />

            <Text style={styles.destino}>
                {viagem.destino}
            </Text>

            <Text>{viagem.data}</Text>

            <Text>
                {"❤️".repeat(viagem.avaliacao)}
            </Text>

            <TouchableOpacity
                style={styles.botao}
                onPress={onDetalhes}
            >
                <Text style={styles.textoBotao}>
                    Ver detalhes
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 3,
    },

    imagem: {
        width: "100%",
        height: 180,
        borderRadius: 10,
        marginBottom: 10,
    },

    destino: {
        fontSize: 20,
        fontWeight: "bold",
    },

    botao: {
        backgroundColor: "#2196F3",
        marginTop: 10,
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },

    textoBotao: {
        color: "#fff",
        fontWeight: "bold",
    },
});