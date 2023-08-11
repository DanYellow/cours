
// It's worth noting - if your components have state, 
// you need to handle re-initializing that state in the pool's ActionOnGet.

// In my own Object Pool implementation I handled this by having something 
// like an "IPoolable" interface that components can implement to handle 
// the Get/Release lifecycle events from pooling, 
// and iterating over those components.

interface IPoolable
{
    void Get();
    // void Release();
}