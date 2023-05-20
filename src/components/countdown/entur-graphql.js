import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.entur.io/journey-planner/v3/graphql',
  cache: new InMemoryCache()
});

async function getJourneys(fromStation, toStation, fromTime) {
  const GET_JOURNEYS = gql`
    query GetJourneys($fromStation: String!, $toStation: String!, $fromTime: DateTime!) {
      trip(
        from: { place: $fromStation }
        numTripPatterns: 3
        dateTime: $fromTime
        arriveBy: false
        to: { place: $toStation }
        timetableView: true
      ) {
        dateTime
        nextPageCursor
        previousPageCursor
        metadata {
          nextDateTime
          prevDateTime
        }
        tripPatterns {
          expectedStartTime
          duration
          walkDistance
          aimedEndTime
          aimedStartTime
          endTime
          expectedEndTime
          distance
          startTime
          waitingTime
          systemNotices {
            tag
            text
          }
        }
        toPlace {
          name
        }
        fromPlace {
          name
        }
      }
    }
  `;

  const result = await client.query({
    query: GET_JOURNEYS,
    variables: { fromStation, toStation, fromTime }
  });

  return result.data.trip;
}

export default getJourneys;