import React, { PureComponent } from 'react'
import { View, StyleSheet, Text, Image, TouchableNativeFeedback, Alert } from 'react-native'

class FilmItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { movie, getImageFromApi } = this.props;
        return (
            <View style={styles.main_container}>
                <TouchableNativeFeedback onPress={() => handleClick(movie)
                }>
                    <Image
                        style={styles.image}
                        source={{ uri: getImageFromApi(movie.poster_path) }}
                    />
                </TouchableNativeFeedback>

                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>{movie.title}</Text>
                        <Text style={styles.vote_text}>{movie.vote_average}</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={3}>{movie.overview === "" ? "No description..." : movie.overview}</Text>
                        {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>Sorti le {movie.release_date}</Text>
                    </View>
                </View>
            </View>
        )
    };
};

const handleClick = movie => {
    Alert.alert('Info', movie.overview);
};

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#EBEDEF',
        margin: 5
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    }
});

export default FilmItem;
