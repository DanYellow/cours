using UnityEngine;

// https://www.youtube.com/watch?v=efYt5h2i_1A
// Unlit > texture
public class ScrollBackground : MonoBehaviour
{
    [Range(0.1f, 100)]
    public float speed = 0;

    public Renderer render;

    // Update is called once per frame
    void Update()
    {
        render.material.mainTextureOffset = new Vector2(Time.time * speed, 0f);
    }
}
